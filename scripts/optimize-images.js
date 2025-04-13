const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const PROJECTS_DIR = path.join(ASSETS_DIR, 'projects');

// Create WebP versions of all images and optimize them
async function optimizeImages() {
  try {
    // Ensure directories exist
    await fs.ensureDir(ASSETS_DIR);
    await fs.ensureDir(PROJECTS_DIR);
    
    console.log('Starting image optimization...');
    
    // Get all image files from assets directory
    const processDirectory = async (directory) => {
      const files = await fs.readdir(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isDirectory()) {
          // Process subdirectories recursively
          await processDirectory(filePath);
        } else {
          // Check if file is an image
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            try {
              console.log(`Optimizing: ${filePath}`);
              
              // Create optimized version
              const image = sharp(filePath);
              const metadata = await image.metadata();
              
              // Resize if image is too large (over 1500px)
              if (metadata.width > 1500 || metadata.height > 1500) {
                image.resize({
                  width: Math.min(metadata.width, 1500),
                  height: Math.min(metadata.height, 1500),
                  fit: 'inside',
                  withoutEnlargement: true
                });
              }
              
              // Save optimized image (overwrite original)
              await image
                .jpeg({ quality: 80, progressive: true })
                .toFile(filePath + '.optimized');
                
              await fs.rename(filePath + '.optimized', filePath);
              
              // Create WebP version if it doesn't already exist
              if (ext !== '.webp') {
                const webpPath = path.join(
                  path.dirname(filePath), 
                  path.basename(filePath, ext) + '.webp'
                );
                
                if (!await fs.pathExists(webpPath)) {
                  await image
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                  console.log(`Created WebP: ${webpPath}`);
                }
              }
            } catch (err) {
              console.error(`Error processing ${filePath}:`, err.message);
            }
          }
        }
      }
    };
    
    await processDirectory(ASSETS_DIR);
    console.log('Image optimization completed successfully!');
    
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

optimizeImages();
