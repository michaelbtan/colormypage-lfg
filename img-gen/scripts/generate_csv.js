const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createObjectCsvWriter } = require('csv-writer');

// Load environment variables
dotenv.config();

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

// Prefer service-role key for server-side scripts
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

// Validate required environment variables
if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error('❌ Missing environment variables. Please check your .env file.');
  process.exit(1);
}

// Read config.json to get prompts
const CONFIG_PATH = process.env.CONFIG_PATH ?? "./config.json";
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

// Create a map of slugified titles to descriptions and keywords
// Use the same slugify logic as generate_images.js
function slugify(str, maxLength = 100) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")        // spaces → underscores
    .replace(/[^\w\-]+/g, "")    // drop non-alphanumerics/underscores
    .slice(0, maxLength);
}

const titleDescriptionMap = new Map();
const titleKeywordsMap = new Map();
config.prompts.forEach(prompt => {
  const slugifiedTitle = slugify(prompt.title);
  titleDescriptionMap.set(slugifiedTitle, prompt.description);
  titleKeywordsMap.set(slugifiedTitle, prompt.keywords || []);
});

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Pinterest optimal posting times based on research
// Best times: 8PM, 4PM, 9PM, 3PM, 2PM - post 5 images per day
function getStaggeredPublishDate(index) {
  const now = new Date();
  
  // Best times of day in 24-hour format - 5 images per day
  const optimalHours = [20, 16, 21, 15, 14]; // 8PM, 4PM, 9PM, 3PM, 2PM
  
  // Calculate which day and time slot
  const daysAhead = Math.floor(index / optimalHours.length);
  const hourIndex = index % optimalHours.length;
  const targetHour = optimalHours[hourIndex];
  
  // Start from tomorrow to avoid same-day posting conflicts
  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + 1 + daysAhead);
  targetDate.setHours(targetHour, 0, 0, 0);
  
  // Format as Pinterest expects: YYYY-MM-DDTHH:mm:ss
  return targetDate.toISOString().slice(0, 19);
}

// Function to determine content type from file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return types[ext] || 'application/octet-stream';
}

// Main upload + CSV generation function
async function uploadDirectoryAndGenerateCSVs(localDirPath) {
  const files = getAllFiles(localDirPath);
  const coloringPagesRecords = [];
  const pinterestRecords = [];
  const coloringPageCategoriesRecords = [];

  for (const file of files) {
    const fileName = path.basename(file); // only the file name
    const fileBuffer = fs.readFileSync(file);
    const contentType = getContentType(file);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`❌ Error uploading ${fileName}:`, error);
    } else {
      console.log(`✅ Uploaded ${fileName}`);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      // Remove _coloring suffix if present and get base name
      const fileNameWithoutExt = path.basename(file, path.extname(file))
        .replace(/_coloring$/, '');

      // Look up the description and keywords from our maps
      const description = titleDescriptionMap.get(fileNameWithoutExt) || '';
      const configKeywords = titleKeywordsMap.get(fileNameWithoutExt) || [];

      // Build CSV record
      const pageTitle = encodeURIComponent(fileNameWithoutExt.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      
      coloringPagesRecords.push({
        title: pageTitle,
        description: description,
        image_url: publicUrl,
        file_name: fileName,
        is_published: true,
      });

      // Build coloring page categories record
      coloringPageCategoriesRecords.push({
        coloring_page_title: pageTitle,
        category_id: config.categoryId
      });


      // Build Pinterest CSV record
      const title = fileNameWithoutExt.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const keywords = [...configKeywords, 'coloring page', 'printable', 'kids activity'].join(', ');
      // Stagger posting times across optimal Pinterest hours
      const currentDate = getStaggeredPublishDate(coloringPagesRecords.length);
      
      pinterestRecords.push({
        title: decodeURI(title),
        media_url: publicUrl,
        pinterest_board: config.pinterestBoard || '',
        description: description || `${decodeURI(title)} coloring page - Perfect for kids and adults! Download and print this fun coloring activity.`,
        link: `https://colormypage.com/coloring-page/${encodeURIComponent(fileNameWithoutExt)}`,
        publish_date: currentDate,
        keywords: keywords
      });
    }
  }

  // Write coloring_pages.csv
  const pagesCsvWriter = createObjectCsvWriter({
    path: path.join(__dirname, '../csv/coloring_pages.csv'),
    header: [
      { id: 'title', title: 'title' },
      { id: 'description', title: 'description' },
      { id: 'image_url', title: 'image_url' },
      { id: 'file_name', title: 'file_name' },
      { id: 'is_published', title: 'is_published' },
    ],
  });
  await pagesCsvWriter.writeRecords(coloringPagesRecords);
  console.log('✅ CSV file created: csv/coloring_pages.csv');

  // Write pinterest_upload.csv
  const pinterestCsvWriter = createObjectCsvWriter({
    path: path.join(__dirname, '../csv/pinterest_upload.csv'),
    header: [
      { id: 'title', title: 'Title' },
      { id: 'media_url', title: 'Media URL' },
      { id: 'pinterest_board', title: 'Pinterest board' },
      { id: 'description', title: 'Description' },
      { id: 'link', title: 'Link' },
      { id: 'publish_date', title: 'Publish date' },
      { id: 'keywords', title: 'Keywords' },
    ],
  });
  await pinterestCsvWriter.writeRecords(pinterestRecords);
  console.log('✅ CSV file created: csv/pinterest_upload.csv');

  // Write coloring_page_categories.csv
  const categoriesCsvWriter = createObjectCsvWriter({
    path: path.join(__dirname, '../csv/coloring_page_categories.csv'),
    header: [
      { id: 'coloring_page_title', title: 'coloring_page_title' },
      { id: 'category_id', title: 'category_id' },
    ],
  });
  await categoriesCsvWriter.writeRecords(coloringPageCategoriesRecords);
  console.log('✅ CSV file created: csv/coloring_page_categories.csv');
}

// Recursively get all file paths in a directory
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(file));
    } else {
      results.push(file);
    }
  });

  return results;
}

// Run the script
const localDir = path.join(__dirname, '../coloring_pages');
uploadDirectoryAndGenerateCSVs(localDir)
  .then(() => console.log('✅ Upload and CSV generation complete'))
  .catch((err) => console.error('❌ Upload failed:', err));
