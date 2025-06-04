import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertNeighborhoodSchema } from '@shared/schema';
import { validateBody } from '../../server/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = validateBody(insertNeighborhoodSchema, req, res);
  if (!data) return;
  try {
    const neighborhood = await storage.createNeighborhood(data);
    res.status(201).json(neighborhood);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create neighborhood' });
  }
}