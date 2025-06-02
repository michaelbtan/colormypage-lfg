import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error('❌ Missing environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadDirectory(localDirPath, destinationFolder) {
  const files = getAllFiles(localDirPath);

  for (const file of files) {
    const relativePath = path.relative(localDirPath, file);
    const storagePath = `${destinationFolder}/${relativePath}`;
    const fileBuffer = fs.readFileSync(file);
    const contentType = mime.getType(file) || 'application/octet-stream';

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`❌ Error uploading ${relativePath}:`, error);
    } else {
      console.log(`✅ Uploaded ${relativePath} to ${storagePath}`);
    }
  }
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
const destinationFolderName = process.argv[2] || 'default-folder-name'; // e.g., run: npm run upload my-folder

uploadDirectory(localDir, destinationFolderName)
  .then(() => console.log('✅ Upload complete'))
  .catch((err) => console.error('❌ Upload failed:', err));
