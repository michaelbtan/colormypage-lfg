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

// Create a map of slugified titles to descriptions
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
config.prompts.forEach(prompt => {
  const slugifiedTitle = slugify(prompt.title);
  titleDescriptionMap.set(slugifiedTitle, prompt.description);
});

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

      // Look up the description from our map
      const description = titleDescriptionMap.get(fileNameWithoutExt) || '';

      // Build CSV record
      coloringPagesRecords.push({
        title: encodeURIComponent(fileNameWithoutExt.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')),
        description: description,
        image_url: publicUrl,
        file_name: fileName,
        is_published: true,
      });

      coloringPageCategoriesRecords.push({
        coloring_page_id: fileNameWithoutExt,
        category_id: '',
      });
    }
  }

  // Write coloring_pages.csv
  const pagesCsvWriter = createObjectCsvWriter({
    path: 'coloring_pages.csv',
    header: [
      { id: 'title', title: 'title' },
      { id: 'description', title: 'description' },
      { id: 'image_url', title: 'image_url' },
      { id: 'file_name', title: 'file_name' },
      { id: 'is_published', title: 'is_published' },
    ],
  });
  await pagesCsvWriter.writeRecords(coloringPagesRecords);
  console.log('✅ CSV file created: coloring_pages.csv');
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
const localDir = path.join(__dirname, '../to_upload');
uploadDirectoryAndGenerateCSVs(localDir)
  .then(() => console.log('✅ Upload and CSV generation complete'))
  .catch((err) => console.error('❌ Upload failed:', err));
