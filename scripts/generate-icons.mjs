import { readFileSync } from 'fs';
import sharp from 'sharp';

const svg = readFileSync('app/icon.svg');
await sharp(svg).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(svg).resize(512, 512).png().toFile('public/icon-512.png');
console.log('Icônes PNG générées : public/icon-192.png, public/icon-512.png');
