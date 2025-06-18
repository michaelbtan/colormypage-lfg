const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'coloring_pages');
const targetDir = path.join(__dirname, '..', 'to_upload');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);
const imageFiles = files.filter(file => 
  file.toLowerCase().endsWith('.png') || 
  file.toLowerCase().endsWith('.jpg') || 
  file.toLowerCase().endsWith('.jpeg')
);

console.log(`Found ${imageFiles.length} image files to copy...`);

imageFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied: ${file}`);
});

console.log(`Successfully copied ${imageFiles.length} images to to_upload directory`);