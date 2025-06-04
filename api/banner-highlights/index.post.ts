import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertBannerHighlightSchema } from '@shared/schema';
import { validateBody } from '../../server/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = validateBody(insertBannerHighlightSchema, req, res);
  if (!data) return;
  try {
    const bannerHighlight = await storage.createBannerHighlight(data);
    res.status(201).json(bannerHighlight);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create banner highlight' });
  }
}