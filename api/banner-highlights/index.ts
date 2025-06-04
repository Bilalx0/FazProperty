import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const bannerHighlights = await storage.getBannerHighlights();
    res.status(200).json(bannerHighlights);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch banner highlights' });
  }
}