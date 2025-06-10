import { VercelRequest, VercelResponse } from '@vercel/node';

// Try to import storage with proper error handling
let storage: any = null;
let storageError: string | null = null;

try {
  console.log('Attempting to import storage...');
  const storageModule = await import('../../server/storage.js');
  storage = storageModule.storage;
  console.log('Storage imported successfully:', !!storage);
} catch (error) {
  console.error('Failed to import storage:', error);
  storageError = error instanceof Error ? error.message : 'Unknown storage import error';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('=== ENQUIRIES API HANDLER START ===');
  console.log('Method:', req.method);
  console.log('Storage available:', !!storage);
  console.log('Storage error:', storageError);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        console.log('Getting all enquiries...');
        
        // Try to use storage first, fallback to mock data
        if (storage && storage.getEnquiries) {
          try {
            console.log('Using real storage...');
            const enquiries = await storage.getEnquiries();
            console.log('Got enquiries from storage:', enquiries?.length || 0);
            return res.status(200).json(enquiries);
          } catch (storageErr) {
            console.error('Storage query failed:', storageErr);
            // Fall through to mock data
          }
        }
        
        // Mock data fallback
        console.log('Using mock data...');
        const mockEnquiries = [
          { 
            id: 1, 
            name: 'John Doe', 
            email: 'john@example.com', 
            message: 'Interested in property listing',
            phone: '+1-555-0123',
            propertyId: 1,
            status: 'new',
            createdAt: new Date().toISOString()
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'jane@example.com', 
            message: 'Looking for commercial space',
            phone: '+1-555-0124',
            propertyId: 2,
            status: 'contacted',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        
        return res.status(200).json({
          data: mockEnquiries,
          source: 'mock',
          storageError: storageError
        });
      
      case 'POST':
        console.log('Creating new enquiry...');
        const newEnquiry = {
          id: Date.now(),
          ...req.body,
          status: 'new',
          createdAt: new Date().toISOString()
        };
        
        // Try to use storage first
        if (storage && storage.createEnquiry) {
          try {
            const result = await storage.createEnquiry(newEnquiry);
            return res.status(201).json(result);
          } catch (storageErr) {
            console.error('Storage create failed:', storageErr);
            // Fall through to mock response
          }
        }
        
        console.log('New enquiry created (mock):', newEnquiry);
        return res.status(201).json(newEnquiry);
        
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
      storageError: storageError,
      timestamp: new Date().toISOString()
    });
  }
}