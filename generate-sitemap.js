import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs';

const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, 'public');

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/beta', changefreq: 'weekly', priority: 0.7 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.7 },
  { url: '/auth/signup', changefreq: 'monthly', priority: 0.5 },
  { url: '/auth/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
];

async function generateSitemap() {
  try {
    await fs.promises.mkdir(publicDir, { recursive: true });
  } catch (err) {
    console.error('Error creating public directory:', err);
    return;
  }

  const writeStream = createWriteStream(path.resolve(publicDir, 'sitemap.xml'));
  const sitemap = new SitemapStream({ hostname: 'https://www.authmate.xyz' }); // ✅ Fixed

  sitemap.pipe(writeStream).on('finish', () => {
    console.log('✅ Sitemap generated successfully');
  });

  pages.forEach((page) => sitemap.write(page));
  sitemap.end();
}

generateSitemap().catch((error) => {
  console.error('❌ Error generating sitemap:', error);
});
