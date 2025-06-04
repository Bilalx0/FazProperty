import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertDevelopmentSchema } from '@shared/schema';
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
    const data = validateBody(insertDevelopmentSchema.partial(), req, res);
    if (!data) return;
    const development = await storage.updateDevelopment(id, data);
    if (!development) {
      return res.status(404).json({ message: 'Development not found' });
    }
    res.status(200).json(development);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update development' });
  }
}