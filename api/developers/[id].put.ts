import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertDeveloperSchema } from '@shared/schema';
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
    const data = validateBody(insertDeveloperSchema.partial(), req, res);
    if (!data) return;
    const developer = await storage.updateDeveloper(id, data);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.status(200).json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update developer' });
  }
}