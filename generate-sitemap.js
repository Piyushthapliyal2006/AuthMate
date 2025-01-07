import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs';

// Use process.cwd() to get the current working directory (root of the project)
const rootDir = process.cwd(); 

// Resolve the correct path for the 'public' directory
const publicDir = path.resolve(rootDir, 'public');

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/docs', changefreq: 'weekly', priority: 0.8 },
];

async function generateSitemap() {
  // Check if the 'public' folder exists and create it if not
  try {
    await fs.promises.mkdir(publicDir, { recursive: true });
  } catch (err) {
    console.error('Error creating public directory:', err);
    return;
  }

  const writeStream = createWriteStream(path.resolve(publicDir, 'sitemap.xml'));

  const sitemap = new SitemapStream({ hostname: 'https://authmate.xyz' });

  sitemap.pipe(writeStream).on('finish', () => {
    console.log('Sitemap generated successfully');
  });

  pages.forEach((page) => sitemap.write(page));

  sitemap.end();
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
});
