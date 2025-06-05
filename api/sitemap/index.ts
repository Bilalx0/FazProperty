import { storage } from '../../server/storage';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const sitemapEntries = await storage.getSitemapEntries();
    res.status(200).json(sitemapEntries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sitemap entries' });
  }
}