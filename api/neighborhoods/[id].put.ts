import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertNeighborhoodSchema } from '@shared/schema';
import { validateBody } from '../../server/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const data = validateBody(insertNeighborhoodSchema.partial(), req, res);
    if (!data) return;
    const neighborhood = await storage.updateNeighborhood(id, data);
    if (!neighborhood) {
      return res.status(404).json({ message: 'Neighborhood not found' });
    }
    res.status(200).json(neighborhood);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update neighborhood' });
  }
}