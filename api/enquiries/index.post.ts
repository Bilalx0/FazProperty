import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertEnquirySchema } from '@shared/schema';
import { validateBody } from '../../server/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = validateBody(insertEnquirySchema, req, res);
  if (!data) return;
  try {
    const enquiry = await storage.createEnquiry(data);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create enquiry' });
  }
}