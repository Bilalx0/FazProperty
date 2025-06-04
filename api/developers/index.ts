import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const developers = await storage.getDevelopers();
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch developers' });
  }
}