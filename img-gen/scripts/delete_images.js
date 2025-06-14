#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function deleteImagesInDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist.`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'];
  let deletedCount = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    
    if (imageExtensions.includes(ext)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
        deletedCount++;
      } catch (error) {
        console.error(`Error deleting ${filePath}:`, error.message);
      }
    }
  });

  console.log(`Deleted ${deletedCount} image(s) from ${dirPath}`);
}

const coloringPagesDir = path.join(__dirname, '..', 'coloring_pages');
const toUploadDir = path.join(__dirname, '..', 'to_upload');
const imagesDir = path.join(__dirname, '..', 'images');

console.log('Starting image deletion...');
deleteImagesInDirectory(coloringPagesDir);
deleteImagesInDirectory(toUploadDir);
deleteImagesInDirectory(imagesDir);
console.log('Image deletion completed.');