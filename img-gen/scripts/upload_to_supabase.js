import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import dotenv from 'dotenv';
import { createObjectCsvWriter } from 'csv-writer';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error('❌ Missing environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadDirectoryAndGenerateCSVs(localDirPath, destinationFolder) {
  const files = getAllFiles(localDirPath);
  const coloringPagesRecords = [];
  const coloringPageCategoriesRecords = [];

  for (const file of files) {
    const relativePath = path.relative(localDirPath, file);
    const storagePath = `${destinationFolder}/${relativePath}`;
    const fileBuffer = fs.readFileSync(file);
    const contentType = mime.getType(file) || 'application/octet-stream';

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`❌ Error uploading ${relativePath}:`, error);
    } else {
      console.log(`✅ Uploaded ${relativePath} to ${storagePath}`);

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      const publicUrl = publicUrlData.publicUrl;

      const fileNameWithoutExt = path.basename(file, path.extname(file));

      // Add to coloring_pages.csv
      coloringPagesRecords.push({
        title: fileNameWithoutExt,
        description: '',
        image_url: publicUrl,
        file_name: path.basename(file),
        isPublished: true,
      });

      // Add to coloring_page_categories.csv
      coloringPageCategoriesRecords.push({
        coloring_page_id: fileNameWithoutExt,
        category_id: '',
      });
    }
  }

  // Write to coloring_pages.csv
  const pagesCsvWriter = createObjectCsvWriter({
    path: 'coloring_pages.csv',
    header: [
      { id: 'title', title: 'title' },
      { id: 'description', title: 'description' },
      { id: 'image_url', title: 'image_url' },
      { id: 'file_name', title: 'file_name' },
      { id: 'isPublished', title: 'isPublished' },
    ],
  });
  await pagesCsvWriter.writeRecords(coloringPagesRecords);
  console.log('✅ CSV file created: coloring_pages.csv');

  // Write to coloring_page_categories.csv
  const categoriesCsvWriter = createObjectCsvWriter({
    path: 'coloring_page_categories.csv',
    header: [
      { id: 'coloring_page_id', title: 'coloring_page_id' },
      { id: 'category_id', title: 'category_id' },
    ],
  });
  await categoriesCsvWriter.writeRecords(coloringPageCategoriesRecords);
  console.log('✅ CSV file created: coloring_page_categories.csv');
}

// Helper to recursively get all file paths in a directory
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

// Example usage
const localDir = path.join(__dirname, '../to_upload');
const destinationFolderName = process.argv[2] || 'default-folder-name';

uploadDirectoryAndGenerateCSVs(localDir, destinationFolderName)
  .then(() => console.log('✅ Upload and CSV generation complete'))
  .catch((err) => console.error('❌ Upload failed:', err));
