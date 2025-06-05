import { storage } from '../../server/storage';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const properties = await storage.getProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
}