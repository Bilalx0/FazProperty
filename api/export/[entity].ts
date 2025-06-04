import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { Parser } from 'json2csv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const entity = req.query.entity as string;
    let data;

    switch (entity) {
      case 'properties':
        data = await storage.getProperties();
        break;
      case 'neighborhoods':
        data = await storage.getNeighborhoods();
        break;
      case 'developments':
        data = await storage.getDevelopments();
        break;
      case 'enquiries':
        data = await storage.getEnquiries();
        break;
      case 'agents':
        data = await storage.getAgents();
        break;
      case 'articles':
        data = await storage.getArticles();
        break;
      case 'bannerHighlights':
        data = await storage.getBannerHighlights();
        break;
      case 'developers':
        data = await storage.getDevelopers();
        break;
      case 'sitemap':
        data = await storage.getSitemapEntries();
        break;
      default:
        return res.status(400).json({ message: 'Invalid entity type' });
    }

    const parser = new Parser();
    const csv = parser.parse(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${entity}.csv`);
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export data' });
  }
}