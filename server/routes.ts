import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertPropertySchema, 
  insertNeighborhoodSchema, 
  insertDevelopmentSchema, 
  insertEnquirySchema, 
  insertAgentSchema, 
  insertArticleSchema, 
  insertBannerHighlightSchema, 
  insertDeveloperSchema, 
  insertSitemapSchema 
} from "@shared/schema";

// Utility function to validate request body against schema
function validateBody<T>(schema: z.ZodType<T>, req: Request, res: Response): T | null {
  try {
    return schema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.errors 
      });
    } else {
      res.status(400).json({ message: 'Invalid request data' });
    }
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for properties
  app.get('/api/properties', async (_req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch properties' });
    }
  });

  app.get('/api/properties/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch property' });
    }
  });

  app.post('/api/properties', async (req, res) => {
    const data = validateBody(insertPropertySchema, req, res);
    if (!data) return;
    
    try {
      const property = await storage.createProperty(data);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create property' });
    }
  });

  app.put('/api/properties/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertPropertySchema.partial(), req, res);
      if (!data) return;
      
      const property = await storage.updateProperty(id, data);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update property' });
    }
  });

  app.delete('/api/properties/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteProperty(id);
      if (!success) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete property' });
    }
  });

  // API routes for neighborhoods
  app.get('/api/neighborhoods', async (_req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch neighborhoods' });
    }
  });

  app.get('/api/neighborhoods/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const neighborhood = await storage.getNeighborhood(id);
      if (!neighborhood) {
        return res.status(404).json({ message: 'Neighborhood not found' });
      }
      
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch neighborhood' });
    }
  });

  app.post('/api/neighborhoods', async (req, res) => {
    const data = validateBody(insertNeighborhoodSchema, req, res);
    if (!data) return;
    
    try {
      const neighborhood = await storage.createNeighborhood(data);
      res.status(201).json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create neighborhood' });
    }
  });

  app.put('/api/neighborhoods/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertNeighborhoodSchema.partial(), req, res);
      if (!data) return;
      
      const neighborhood = await storage.updateNeighborhood(id, data);
      if (!neighborhood) {
        return res.status(404).json({ message: 'Neighborhood not found' });
      }
      
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update neighborhood' });
    }
  });

  app.delete('/api/neighborhoods/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteNeighborhood(id);
      if (!success) {
        return res.status(404).json({ message: 'Neighborhood not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete neighborhood' });
    }
  });

  // API routes for developments
  app.get('/api/developments', async (_req, res) => {
    try {
      const developments = await storage.getDevelopments();
      res.json(developments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch developments' });
    }
  });

  app.get('/api/developments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const development = await storage.getDevelopment(id);
      if (!development) {
        return res.status(404).json({ message: 'Development not found' });
      }
      
      res.json(development);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch development' });
    }
  });

  app.post('/api/developments', async (req, res) => {
    const data = validateBody(insertDevelopmentSchema, req, res);
    if (!data) return;
    
    try {
      const development = await storage.createDevelopment(data);
      res.status(201).json(development);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create development' });
    }
  });

  app.put('/api/developments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertDevelopmentSchema.partial(), req, res);
      if (!data) return;
      
      const development = await storage.updateDevelopment(id, data);
      if (!development) {
        return res.status(404).json({ message: 'Development not found' });
      }
      
      res.json(development);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update development' });
    }
  });

  app.delete('/api/developments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteDevelopment(id);
      if (!success) {
        return res.status(404).json({ message: 'Development not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete development' });
    }
  });

  // API routes for enquiries
  app.get('/api/enquiries', async (_req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch enquiries' });
    }
  });

  app.get('/api/enquiries/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const enquiry = await storage.getEnquiry(id);
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      
      res.json(enquiry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch enquiry' });
    }
  });

  app.post('/api/enquiries', async (req, res) => {
    const data = validateBody(insertEnquirySchema, req, res);
    if (!data) return;
    
    try {
      const enquiry = await storage.createEnquiry(data);
      res.status(201).json(enquiry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create enquiry' });
    }
  });

  app.put('/api/enquiries/:id/read', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const enquiry = await storage.markEnquiryAsRead(id);
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      
      res.json(enquiry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to mark enquiry as read' });
    }
  });

  app.delete('/api/enquiries/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
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
  });

  // API routes for agents
  app.get('/api/agents', async (_req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agents' });
    }
  });

  app.get('/api/agents/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const agent = await storage.getAgent(id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agent' });
    }
  });

  app.post('/api/agents', async (req, res) => {
    const data = validateBody(insertAgentSchema, req, res);
    if (!data) return;
    
    try {
      const agent = await storage.createAgent(data);
      res.status(201).json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agent' });
    }
  });

  app.put('/api/agents/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertAgentSchema.partial(), req, res);
      if (!data) return;
      
      const agent = await storage.updateAgent(id, data);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update agent' });
    }
  });

  app.delete('/api/agents/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteAgent(id);
      if (!success) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete agent' });
    }
  });

  // API routes for articles
  app.get('/api/articles', async (_req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch articles' });
    }
  });

  app.get('/api/articles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch article' });
    }
  });

  app.post('/api/articles', async (req, res) => {
    const data = validateBody(insertArticleSchema, req, res);
    if (!data) return;
    
    try {
      const article = await storage.createArticle(data);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create article' });
    }
  });

  app.put('/api/articles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertArticleSchema.partial(), req, res);
      if (!data) return;
      
      const article = await storage.updateArticle(id, data);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update article' });
    }
  });

  app.delete('/api/articles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteArticle(id);
      if (!success) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete article' });
    }
  });

  // API routes for banner highlights
  app.get('/api/banner-highlights', async (_req, res) => {
    try {
      const bannerHighlights = await storage.getBannerHighlights();
      res.json(bannerHighlights);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch banner highlights' });
    }
  });

  app.get('/api/banner-highlights/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const bannerHighlight = await storage.getBannerHighlight(id);
      if (!bannerHighlight) {
        return res.status(404).json({ message: 'Banner highlight not found' });
      }
      
      res.json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch banner highlight' });
    }
  });

  app.post('/api/banner-highlights', async (req, res) => {
    const data = validateBody(insertBannerHighlightSchema, req, res);
    if (!data) return;
    
    try {
      const bannerHighlight = await storage.createBannerHighlight(data);
      res.status(201).json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create banner highlight' });
    }
  });

  app.put('/api/banner-highlights/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertBannerHighlightSchema.partial(), req, res);
      if (!data) return;
      
      const bannerHighlight = await storage.updateBannerHighlight(id, data);
      if (!bannerHighlight) {
        return res.status(404).json({ message: 'Banner highlight not found' });
      }
      
      res.json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update banner highlight' });
    }
  });

  app.delete('/api/banner-highlights/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteBannerHighlight(id);
      if (!success) {
        return res.status(404).json({ message: 'Banner highlight not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete banner highlight' });
    }
  });

  // API routes for developers
  app.get('/api/developers', async (_req, res) => {
    try {
      const developers = await storage.getDevelopers();
      res.json(developers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch developers' });
    }
  });

  app.get('/api/developers/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const developer = await storage.getDeveloper(id);
      if (!developer) {
        return res.status(404).json({ message: 'Developer not found' });
      }
      
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch developer' });
    }
  });

  app.post('/api/developers', async (req, res) => {
    const data = validateBody(insertDeveloperSchema, req, res);
    if (!data) return;
    
    try {
      const developer = await storage.createDeveloper(data);
      res.status(201).json(developer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create developer' });
    }
  });

  app.put('/api/developers/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertDeveloperSchema.partial(), req, res);
      if (!data) return;
      
      const developer = await storage.updateDeveloper(id, data);
      if (!developer) {
        return res.status(404).json({ message: 'Developer not found' });
      }
      
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update developer' });
    }
  });

  app.delete('/api/developers/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteDeveloper(id);
      if (!success) {
        return res.status(404).json({ message: 'Developer not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete developer' });
    }
  });

  // API routes for sitemap
  app.get('/api/sitemap', async (_req, res) => {
    try {
      const sitemapEntries = await storage.getSitemapEntries();
      res.json(sitemapEntries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch sitemap entries' });
    }
  });

  app.get('/api/sitemap/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const sitemapEntry = await storage.getSitemapEntry(id);
      if (!sitemapEntry) {
        return res.status(404).json({ message: 'Sitemap entry not found' });
      }
      
      res.json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch sitemap entry' });
    }
  });

  app.post('/api/sitemap', async (req, res) => {
    const data = validateBody(insertSitemapSchema, req, res);
    if (!data) return;
    
    try {
      const sitemapEntry = await storage.createSitemapEntry(data);
      res.status(201).json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create sitemap entry' });
    }
  });

  app.put('/api/sitemap/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const data = validateBody(insertSitemapSchema.partial(), req, res);
      if (!data) return;
      
      const sitemapEntry = await storage.updateSitemapEntry(id, data);
      if (!sitemapEntry) {
        return res.status(404).json({ message: 'Sitemap entry not found' });
      }
      
      res.json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update sitemap entry' });
    }
  });

  app.delete('/api/sitemap/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      
      const success = await storage.deleteSitemapEntry(id);
      if (!success) {
        return res.status(404).json({ message: 'Sitemap entry not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete sitemap entry' });
    }
  });

  // CSV export/import routes
  app.get('/api/export/:entity', async (req, res) => {
    try {
      const entity = req.params.entity;
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
      
      // Convert data to CSV format in a real implementation
      // For now, just return the data as JSON
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to export data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
