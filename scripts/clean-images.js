const fs = require('fs-extra');
const path = require('path');

// Define default fallback images
const fallbacks = {
  profile: 'senesh.jpeg',
  project: 'project-fallback.jpg',
  nsbm: 'nsbm-logo.png',
  plymouth: 'plymouth-logo.png'
};

// Paths to check and ensure
const requiredPaths = [
  path.join(__dirname, '../public/assets'),
  path.join(__dirname, '../public/assets/projects')
];

// Ensure default fallback images exist
async function ensureFallbackImages() {
  console.log('Ensuring fallback images exist...');
  
  // Create directories if they don't exist
  for (const dir of requiredPaths) {
    await fs.ensureDir(dir);
  }

  const profilePath = path.join(requiredPaths[0], fallbacks.profile);
  const projectPath = path.join(requiredPaths[0], fallbacks.project);
  const nsbmPath = path.join(requiredPaths[0], fallbacks.nsbm);
  const plymouthPath = path.join(requiredPaths[0], fallbacks.plymouth);

  // Create simple SVG fallbacks if images don't exist
  if (!await fs.pathExists(profilePath)) {
    console.log(`Creating fallback profile image: ${profilePath}`);
    const profileSvg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#3B82F6" />
      <text x="50%" y="50%" font-family="Arial" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">SF</text>
    </svg>`;
    await fs.writeFile(profilePath, profileSvg);
  }

  if (!await fs.pathExists(projectPath)) {
    console.log(`Creating fallback project image: ${projectPath}`);
    const projectSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#f0f0f0" />
      <text x="50%" y="50%" font-family="Arial" font-size="32" fill="#333" text-anchor="middle" dominant-baseline="middle">Project Image</text>
    </svg>`;
    await fs.writeFile(projectPath, projectSvg);
  }

  if (!await fs.pathExists(nsbmPath)) {
    console.log(`Creating fallback NSBM logo: ${nsbmPath}`);
    const nsbmSvg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="#076633" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">NSBM</text>
    </svg>`;
    await fs.writeFile(nsbmPath, nsbmSvg);
  }

  if (!await fs.pathExists(plymouthPath)) {
    console.log(`Creating fallback Plymouth logo: ${plymouthPath}`);
    const plymouthSvg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="#0057b8" />
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Plymouth University</text>
    </svg>`;
    await fs.writeFile(plymouthPath, plymouthSvg);
  }
}

// Read index.js and replace any broken image URLs with local fallbacks
async function fixImageReferences() {
  console.log('Fixing image references in code...');
  const indexPath = path.join(__dirname, '../pages/index.js');
  
  if (!await fs.pathExists(indexPath)) {
    console.error('Index file not found!');
    return;
  }
  
  let content = await fs.readFile(indexPath, 'utf8');
  
  // Replace external image URLs with local ones
  content = content.replace(/https:\/\/www\.nsbm\.ac\.lk\/.*?\.png/g, '/assets/nsbm-logo.png');
  content = content.replace(/https:\/\/students\.nsbm\.ac\.lk\/img\/nsbm\.png/g, '/assets/nsbm-logo.png');
  content = content.replace(/https:\/\/th\.bing\.com\/.*?Plymouth.*?/g, '/assets/plymouth-logo.png');
  content = content.replace(/https:\/\/www\.plymouth\.ac\.uk\/.*?logo.*?/g, '/assets/plymouth-logo.png');
  content = content.replace(/https:\/\/avatars\.githubusercontent\.com\/u\/SeneshFitzroy/g, '/assets/senesh.jpeg');
  content = content.replace(/https:\/\/github\.com\/identicons\/SeneshFitzroy\.png/g, '/assets/senesh.jpeg');
  
  await fs.writeFile(indexPath, content);
}

// Cleanup and prepare images
async function run() {
  try {
    console.log('Starting image cleanup process...');
    await ensureFallbackImages();
    await fixImageReferences();
    console.log('Image cleanup completed successfully!');
  } catch (error) {
    console.error('Error during image cleanup:', error);
    process.exit(1);
  }
}

run();
