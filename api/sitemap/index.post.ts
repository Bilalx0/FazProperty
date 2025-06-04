import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertSitemapSchema } from '@shared/schema';
import { validateBody } from '../../server/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = validateBody(insertSitemapSchema, req, res);
  if (!data) return;
  try {
    const sitemapEntry = await storage.createSitemapEntry(data);
    res.status(201).json(sitemapEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sitemap entry' });
  }
}