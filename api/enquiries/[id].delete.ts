import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const success = await storage.deleteEnquiry(id);
    if (!success) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete enquiry' });
  }
}