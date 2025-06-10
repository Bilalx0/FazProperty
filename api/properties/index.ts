import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage.js';
import { insertPropertySchema } from '../../shared/schema.js';
import { validateBody } from '../../server/utils.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle /api/properties (GET all properties, POST new property)
  if (!req.query.id) {
    if (req.method === 'POST') {
      const data = validateBody(insertPropertySchema, req, res);
      if (!data) return;
      try {
        const property = await storage.createProperty(data);
        res.status(201).json(property);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create property' });
      }
    } else if (req.method === 'GET') {
      try {
        const properties = await storage.getProperties();
        res.status(200).json(properties);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch properties' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  // Handle /api/properties/:id (GET, PUT, DELETE by ID)
  else {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    if (req.method === 'GET') {
      try {
        const property = await storage.getProperty(id);
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property' });
      }
    } else if (req.method === 'PUT') {
      const data = validateBody(insertPropertySchema.partial(), req, res);
      if (!data) return;
      try {
        const property = await storage.updateProperty(id, data);
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update property' });
      }
    } else if (req.method === 'DELETE') {
  console.log(`DELETE request for property ID: ${req.query.id}`);
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      console.log('Invalid ID:', req.query.id);
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const success = await storage.deleteProperty(id);
    if (!success) {
      console.log(`Property not found: ${id}`);
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ message: 'Failed to delete property' });
  }
}
}
}
