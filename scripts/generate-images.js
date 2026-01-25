// Script to generate responsive images using Sharp
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');

const images = [
  { name: 'intro-img', sizes: [400, 800, 1200] },
  { name: 'materials-collage', sizes: [500, 1000, 1600] },
  { name: 'incognito-walter', sizes: [400, 800, 1200] },
  { name: 'censored-image-1', sizes: [400, 800] },
  { name: 'censored-image-2', sizes: [400, 800] },
  { name: 'censored-label-1', sizes: [400, 800] },
  { name: 'censored-label-2', sizes: [400, 800] },
  { name: 'footer-img', sizes: [400, 800, 1200] },
  { name: 't-shirt', sizes: [400, 800, 1200] },
  { name: 'gun', sizes: [300, 600] },
  { name: 'gun-shape', sizes: [300, 600] }
];

async function generateResponsiveImages() {
  console.log('🖼️  Generating responsive images...\n');

  for (const image of images) {
    const inputPath = path.join(assetsDir, `${image.name}.png`);
    
    try {
      // Check if source file exists
      await fs.access(inputPath);
      
      console.log(`Processing ${image.name}.png...`);
      
      for (const size of image.sizes) {
        // Generate AVIF
        const avifPath = path.join(assetsDir, `${image.name}-${size}.avif`);
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .avif({ quality: 80, effort: 6 })
          .toFile(avifPath);
        console.log(`  ✓ ${image.name}-${size}.avif`);
        
        // Generate WebP
        const webpPath = path.join(assetsDir, `${image.name}-${size}.webp`);
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(webpPath);
        console.log(`  ✓ ${image.name}-${size}.webp`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`❌ Error processing ${image.name}:`, error.message);
    }
  }
  
  console.log('✅ All responsive images generated!');
}

generateResponsiveImages().catch(console.error);
