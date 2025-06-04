import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const sitemapEntry = await storage.getSitemapEntry(id);
    if (!sitemapEntry) {
      return res.status(404).json({ message: 'Sitemap entry not found' });
    }
    res.status(200).json(sitemapEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sitemap entry' });
  }
}