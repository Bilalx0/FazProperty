import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { InsertProperty } from '../../shared/schema.js';

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

/**
 * Maps XML property data to the application's property schema
 */
function mapXmlToPropertySchema(xmlProperty: any): Partial<InsertProperty> {
  try {
    // This mapping will need to be adjusted based on the actual XML structure
    // from https://zoho.nordstern.ae/property_finder.xml
    return {
      reference: xmlProperty.reference?.[0] || '',
      listingType: xmlProperty.listing_type?.[0] || 'Sale',
      propertyType: xmlProperty.property_type?.[0] || 'Apartment',
      subCommunity: xmlProperty.sub_community?.[0] || '',
      community: xmlProperty.community?.[0] || '',
      region: xmlProperty.region?.[0] || 'Dubai',
      country: xmlProperty.country?.[0] || 'UAE',
      agent: xmlProperty.agent ? JSON.parse(JSON.stringify(xmlProperty.agent[0])) : null,
      price: parseInt(xmlProperty.price?.[0]) || 0,
      currency: xmlProperty.currency?.[0] || 'AED',
      bedrooms: xmlProperty.bedrooms?.[0] ? parseInt(xmlProperty.bedrooms[0]) : null,
      bathrooms: xmlProperty.bathrooms?.[0] ? parseInt(xmlProperty.bathrooms[0]) : null,
      propertyStatus: xmlProperty.property_status?.[0] || '',
      title: xmlProperty.title?.[0] || '',
      description: xmlProperty.description?.[0] || '',
      sqfeetArea: xmlProperty.sqfeet_area?.[0] ? parseInt(xmlProperty.sqfeet_area[0]) : null,
      sqfeetBuiltup: xmlProperty.sqfeet_builtup?.[0] ? parseInt(xmlProperty.sqfeet_builtup[0]) : null,
      isExclusive: xmlProperty.is_exclusive?.[0] === 'true',
      amenities: xmlProperty.amenities?.[0] || '',
      isFeatured: xmlProperty.is_featured?.[0] === 'true',
      isFitted: xmlProperty.is_fitted?.[0] === 'true',
      isFurnished: xmlProperty.is_furnished?.[0] === 'true',
      lifestyle: xmlProperty.lifestyle?.[0] || '',
      permit: xmlProperty.permit?.[0] || '',
      brochure: xmlProperty.brochure?.[0] || '',
      images: xmlProperty.images ? JSON.parse(JSON.stringify(xmlProperty.images[0])) : null,
      development: xmlProperty.development?.[0] || '',
      neighbourhood: xmlProperty.neighbourhood?.[0] || '',
      sold: xmlProperty.sold?.[0] === 'true',
    };
  } catch (error) {
    console.error('Error mapping XML property:', error);
    throw new Error(`Failed to map XML property: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('=== IMPORT PROPERTIES API HANDLER START ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Storage available:', !!storage);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests for this endpoint
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!storage) {
      return res.status(500).json({ message: 'Storage service unavailable', storageError });
    }

    // Fetch XML data from the URL
    const xmlUrl = 'https://zoho.nordstern.ae/property_finder.xml';
    console.log(`Fetching XML data from ${xmlUrl}...`);
    
    const response = await axios.get(xmlUrl);
    const xmlData = response.data;
    
    // Parse XML to JSON
    const parser = new xml2js.Parser({ explicitArray: true, trim: true });
    const result = await parser.parseStringPromise(xmlData);
    
    // Extract properties array from the parsed XML
    // Note: The actual path to properties in the XML structure may need to be adjusted
    const xmlProperties = result.properties?.property || [];
    
    if (!Array.isArray(xmlProperties) || xmlProperties.length === 0) {
      return res.status(404).json({ message: 'No properties found in XML data' });
    }
    
    console.log(`Found ${xmlProperties.length} properties in XML data`);
    
    // Process each property
    const importResults = [];
    const errors = [];
    
    for (const xmlProperty of xmlProperties) {
      try {
        // Map XML property to our schema
        const propertyData = mapXmlToPropertySchema(xmlProperty);
        
        // Check if property with this reference already exists
        const existingProperty = await storage.getPropertyByReference(propertyData.reference);
        
        if (existingProperty) {
          // Update existing property
          const updatedProperty = await storage.updateProperty(existingProperty.id, propertyData);
          importResults.push({
            reference: propertyData.reference,
            action: 'updated',
            id: existingProperty.id
          });
        } else {
          // Create new property
          const newProperty = await storage.createProperty(propertyData as any);
          importResults.push({
            reference: propertyData.reference,
            action: 'created',
            id: newProperty.id
          });
        }
      } catch (error) {
        console.error('Error processing property:', error);
        errors.push({
          reference: xmlProperty.reference?.[0] || 'unknown',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    // Return import results
    return res.status(200).json({
      message: 'Import completed',
      total: xmlProperties.length,
      processed: importResults.length,
      errors: errors.length,
      results: importResults,
      errorDetails: errors
    });
    
  } catch (error) {
    console.error('Import handler error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}