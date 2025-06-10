import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage.js';
import { insertPropertySchema } from '@shared/schema.js';
import { validateBody } from '../../server/utils.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = validateBody(insertPropertySchema, req, res);
  if (!data) return;
  try {
    const property = await storage.createProperty(data);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create property' });
  }
}