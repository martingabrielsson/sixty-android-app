// Generates resources/icon.png (1024x1024, no alpha — required by App Store)
// and resources/splash.png (2732x2732, brand navy background + centered mark)
// from the existing www/icon.svg, for use by @capacitor/assets.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'www', 'icon.svg');
const outDir = path.join(root, 'resources');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const svg = fs.readFileSync(svgPath);

  // App icon: flatten onto the brand navy so there's no transparency (Apple rejects
  // alpha channels in the App Store icon).
  await sharp(svg, { density: 384 })
    .resize(1024, 1024)
    .flatten({ background: '#1c1268' })
    .png()
    .toFile(path.join(outDir, 'icon.png'));

  // Splash screen: brand navy background, logo mark centered at a modest size.
  const markSize = 400;
  const mark = await sharp(svg, { density: 384 }).resize(markSize, markSize).png().toBuffer();
  await sharp({
    create: { width: 2732, height: 2732, channels: 4, background: '#1c1268' },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, 'splash.png'));

  console.log('Wrote resources/icon.png and resources/splash.png');
}

main().catch((e) => { console.error(e); process.exit(1); });
