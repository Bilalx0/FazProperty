import {storage} from '../../server/storage.js'
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const agents = await storage.getAgents();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
}