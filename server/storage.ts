import { users, type User, type InsertUser, 
         properties, type Property, type InsertProperty,
         neighborhoods, type Neighborhood, type InsertNeighborhood,
         developments, type Development, type InsertDevelopment,
         enquiries, type Enquiry, type InsertEnquiry,
         agents, type Agent, type InsertAgent,
         articles, type Article, type InsertArticle,
         bannerHighlights, type BannerHighlight, type InsertBannerHighlight,
         developers, type Developer, type InsertDeveloper,
         sitemap, type Sitemap, type InsertSitemap } from "@shared/schema";

// StorageInterface defines all CRUD operations for the application
export interface IStorage {
  // User operations (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property operations
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertyByReference(reference: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Neighborhood operations
  getNeighborhoods(): Promise<Neighborhood[]>;
  getNeighborhood(id: number): Promise<Neighborhood | undefined>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;
  updateNeighborhood(id: number, neighborhood: Partial<InsertNeighborhood>): Promise<Neighborhood | undefined>;
  deleteNeighborhood(id: number): Promise<boolean>;
  
  // Development operations
  getDevelopments(): Promise<Development[]>;
  getDevelopment(id: number): Promise<Development | undefined>;
  createDevelopment(development: InsertDevelopment): Promise<Development>;
  updateDevelopment(id: number, development: Partial<InsertDevelopment>): Promise<Development | undefined>;
  deleteDevelopment(id: number): Promise<boolean>;
  
  // Enquiry operations
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiry(id: number): Promise<Enquiry | undefined>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateEnquiry(id: number, enquiry: Partial<Enquiry>): Promise<Enquiry | undefined>;
  deleteEnquiry(id: number): Promise<boolean>;
  markEnquiryAsRead(id: number): Promise<Enquiry | undefined>;
  
  // Agent operations
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;
  
  // Article operations
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Banner Highlight operations
  getBannerHighlights(): Promise<BannerHighlight[]>;
  getBannerHighlight(id: number): Promise<BannerHighlight | undefined>;
  createBannerHighlight(bannerHighlight: InsertBannerHighlight): Promise<BannerHighlight>;
  updateBannerHighlight(id: number, bannerHighlight: Partial<InsertBannerHighlight>): Promise<BannerHighlight | undefined>;
  deleteBannerHighlight(id: number): Promise<boolean>;
  
  // Developer operations
  getDevelopers(): Promise<Developer[]>;
  getDeveloper(id: number): Promise<Developer | undefined>;
  createDeveloper(developer: InsertDeveloper): Promise<Developer>;
  updateDeveloper(id: number, developer: Partial<InsertDeveloper>): Promise<Developer | undefined>;
  deleteDeveloper(id: number): Promise<boolean>;
  
  // Sitemap operations
  getSitemapEntries(): Promise<Sitemap[]>;
  getSitemapEntry(id: number): Promise<Sitemap | undefined>;
  createSitemapEntry(sitemapEntry: InsertSitemap): Promise<Sitemap>;
  updateSitemapEntry(id: number, sitemapEntry: Partial<InsertSitemap>): Promise<Sitemap | undefined>;
  deleteSitemapEntry(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private neighborhoods: Map<number, Neighborhood>;
  private developments: Map<number, Development>;
  private enquiries: Map<number, Enquiry>;
  private agents: Map<number, Agent>;
  private articles: Map<number, Article>;
  private bannerHighlights: Map<number, BannerHighlight>;
  private developers: Map<number, Developer>;
  private sitemapEntries: Map<number, Sitemap>;
  
  private currentIds: {
    user: number;
    property: number;
    neighborhood: number;
    development: number;
    enquiry: number;
    agent: number;
    article: number;
    bannerHighlight: number;
    developer: number;
    sitemap: number;
  };

  constructor() {
    // Initialize collections
    this.users = new Map();
    this.properties = new Map();
    this.neighborhoods = new Map();
    this.developments = new Map();
    this.enquiries = new Map();
    this.agents = new Map();
    this.articles = new Map();
    this.bannerHighlights = new Map();
    this.developers = new Map();
    this.sitemapEntries = new Map();
    
    // Initialize IDs
    this.currentIds = {
      user: 1,
      property: 1,
      neighborhood: 1,
      development: 1,
      enquiry: 1,
      agent: 1,
      article: 1,
      bannerHighlight: 1,
      developer: 1,
      sitemap: 1
    };

    // Add example data for testing
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some example data from the CSV files
    this.createProperty({
      reference: "NS1503",
      listingType: "sale",
      propertyType: "villa",
      subCommunity: "Palm Jebel Ali",
      community: "Palm Jebel Ali",
      region: "Dubai",
      country: "AE",
      agent: [{ id: "5vWGNoSRuxte0DAU96KA", name: "Imran Shaikh" }],
      price: 19050000,
      currency: "AED",
      bedrooms: 6,
      bathrooms: 8,
      propertyStatus: "Off Plan",
      title: "BEACH VILLAS 6 BEDROOM SUN,SEA,SAND,SOPHISTICATION",
      description: "Welcome to Palm Jebel Ali, a world-class lifestyle destination meticulously designed and impeccably curated, providing unrivalled luxury living to its residents.",
      sqfeetArea: 7798,
      sqfeetBuiltup: 7798,
      isExclusive: false,
      amenities: "Balcony,BBQ area,Built in wardrobes,Central air conditioning,Covered parking,Fully fitted kitchen,Private Gym,Private Jacuzzi,Kitchen Appliances,Maids Room,Pets allowed,Private Garden,Private Pool,Sauna,Steam room,Study,Sea/Water view,Security,Maintenance,Within a Compound,Indoor swimming pool,Golf view,Terrace,Concierge Service,Spa,Maid Service,Walk-in Closet,Heating,Children's Play Area,Lobby in Building,Children's Pool",
      isFeatured: false,
      isFitted: true,
      images: [],
      isDisabled: false,
    });

    // Add sample enquiry
    this.createEnquiry({
      email: "khalil@example.com",
      message: "",
      name: "Khalil Gibran",
      phone: "12345678910",
      propertyReference: "",
      subject: "general enquiry"
    });
  }

  // User methods (kept from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertyByReference(reference: string): Promise<Property | undefined> {
    return Array.from(this.properties.values()).find(
      (property) => property.reference === reference
    );
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentIds.property++;
    const now = new Date();
    const newProperty: Property = { 
      ...property, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) {
      return undefined;
    }

    const updatedProperty = { 
      ...existingProperty, 
      ...property, 
      updatedAt: new Date() 
    };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Neighborhood methods
  async getNeighborhoods(): Promise<Neighborhood[]> {
    return Array.from(this.neighborhoods.values());
  }

  async getNeighborhood(id: number): Promise<Neighborhood | undefined> {
    return this.neighborhoods.get(id);
  }

  async createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const id = this.currentIds.neighborhood++;
    const now = new Date();
    const newNeighborhood: Neighborhood = { 
      ...neighborhood, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.neighborhoods.set(id, newNeighborhood);
    return newNeighborhood;
  }

  async updateNeighborhood(id: number, neighborhood: Partial<InsertNeighborhood>): Promise<Neighborhood | undefined> {
    const existingNeighborhood = this.neighborhoods.get(id);
    if (!existingNeighborhood) {
      return undefined;
    }

    const updatedNeighborhood = { 
      ...existingNeighborhood, 
      ...neighborhood, 
      updatedAt: new Date() 
    };
    this.neighborhoods.set(id, updatedNeighborhood);
    return updatedNeighborhood;
  }

  async deleteNeighborhood(id: number): Promise<boolean> {
    return this.neighborhoods.delete(id);
  }

  // Development methods
  async getDevelopments(): Promise<Development[]> {
    return Array.from(this.developments.values());
  }

  async getDevelopment(id: number): Promise<Development | undefined> {
    return this.developments.get(id);
  }

  async createDevelopment(development: InsertDevelopment): Promise<Development> {
    const id = this.currentIds.development++;
    const now = new Date();
    const newDevelopment: Development = { 
      ...development, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.developments.set(id, newDevelopment);
    return newDevelopment;
  }

  async updateDevelopment(id: number, development: Partial<InsertDevelopment>): Promise<Development | undefined> {
    const existingDevelopment = this.developments.get(id);
    if (!existingDevelopment) {
      return undefined;
    }

    const updatedDevelopment = { 
      ...existingDevelopment, 
      ...development, 
      updatedAt: new Date() 
    };
    this.developments.set(id, updatedDevelopment);
    return updatedDevelopment;
  }

  async deleteDevelopment(id: number): Promise<boolean> {
    return this.developments.delete(id);
  }

  // Enquiry methods
  async getEnquiries(): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values());
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    return this.enquiries.get(id);
  }

  async createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry> {
    const id = this.currentIds.enquiry++;
    const now = new Date();
    const newEnquiry: Enquiry = { 
      ...enquiry, 
      id, 
      isRead: false,
      createdAt: now 
    };
    this.enquiries.set(id, newEnquiry);
    return newEnquiry;
  }

  async updateEnquiry(id: number, enquiry: Partial<Enquiry>): Promise<Enquiry | undefined> {
    const existingEnquiry = this.enquiries.get(id);
    if (!existingEnquiry) {
      return undefined;
    }

    const updatedEnquiry = { 
      ...existingEnquiry, 
      ...enquiry
    };
    this.enquiries.set(id, updatedEnquiry);
    return updatedEnquiry;
  }

  async deleteEnquiry(id: number): Promise<boolean> {
    return this.enquiries.delete(id);
  }

  async markEnquiryAsRead(id: number): Promise<Enquiry | undefined> {
    const existingEnquiry = this.enquiries.get(id);
    if (!existingEnquiry) {
      return undefined;
    }

    const updatedEnquiry = { 
      ...existingEnquiry, 
      isRead: true
    };
    this.enquiries.set(id, updatedEnquiry);
    return updatedEnquiry;
  }

  // Agent methods
  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.currentIds.agent++;
    const now = new Date();
    const newAgent: Agent = { 
      ...agent, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.agents.set(id, newAgent);
    return newAgent;
  }

  async updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const existingAgent = this.agents.get(id);
    if (!existingAgent) {
      return undefined;
    }

    const updatedAgent = { 
      ...existingAgent, 
      ...agent, 
      updatedAt: new Date() 
    };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAgent(id: number): Promise<boolean> {
    return this.agents.delete(id);
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.currentIds.article++;
    const now = new Date();
    const newArticle: Article = { 
      ...article, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.articles.set(id, newArticle);
    return newArticle;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      return undefined;
    }

    const updatedArticle = { 
      ...existingArticle, 
      ...article, 
      updatedAt: new Date() 
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Banner Highlight methods
  async getBannerHighlights(): Promise<BannerHighlight[]> {
    return Array.from(this.bannerHighlights.values());
  }

  async getBannerHighlight(id: number): Promise<BannerHighlight | undefined> {
    return this.bannerHighlights.get(id);
  }

  async createBannerHighlight(bannerHighlight: InsertBannerHighlight): Promise<BannerHighlight> {
    const id = this.currentIds.bannerHighlight++;
    const now = new Date();
    const newBannerHighlight: BannerHighlight = { 
      ...bannerHighlight, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.bannerHighlights.set(id, newBannerHighlight);
    return newBannerHighlight;
  }

  async updateBannerHighlight(id: number, bannerHighlight: Partial<InsertBannerHighlight>): Promise<BannerHighlight | undefined> {
    const existingBannerHighlight = this.bannerHighlights.get(id);
    if (!existingBannerHighlight) {
      return undefined;
    }

    const updatedBannerHighlight = { 
      ...existingBannerHighlight, 
      ...bannerHighlight, 
      updatedAt: new Date() 
    };
    this.bannerHighlights.set(id, updatedBannerHighlight);
    return updatedBannerHighlight;
  }

  async deleteBannerHighlight(id: number): Promise<boolean> {
    return this.bannerHighlights.delete(id);
  }

  // Developer methods
  async getDevelopers(): Promise<Developer[]> {
    return Array.from(this.developers.values());
  }

  async getDeveloper(id: number): Promise<Developer | undefined> {
    return this.developers.get(id);
  }

  async createDeveloper(developer: InsertDeveloper): Promise<Developer> {
    const id = this.currentIds.developer++;
    const now = new Date();
    const newDeveloper: Developer = { 
      ...developer, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.developers.set(id, newDeveloper);
    return newDeveloper;
  }

  async updateDeveloper(id: number, developer: Partial<InsertDeveloper>): Promise<Developer | undefined> {
    const existingDeveloper = this.developers.get(id);
    if (!existingDeveloper) {
      return undefined;
    }

    const updatedDeveloper = { 
      ...existingDeveloper, 
      ...developer, 
      updatedAt: new Date() 
    };
    this.developers.set(id, updatedDeveloper);
    return updatedDeveloper;
  }

  async deleteDeveloper(id: number): Promise<boolean> {
    return this.developers.delete(id);
  }

  // Sitemap methods
  async getSitemapEntries(): Promise<Sitemap[]> {
    return Array.from(this.sitemapEntries.values());
  }

  async getSitemapEntry(id: number): Promise<Sitemap | undefined> {
    return this.sitemapEntries.get(id);
  }

  async createSitemapEntry(sitemapEntry: InsertSitemap): Promise<Sitemap> {
    const id = this.currentIds.sitemap++;
    const now = new Date();
    const newSitemapEntry: Sitemap = { 
      ...sitemapEntry, 
      id, 
      updatedAt: now, 
      createdAt: now 
    };
    this.sitemapEntries.set(id, newSitemapEntry);
    return newSitemapEntry;
  }

  async updateSitemapEntry(id: number, sitemapEntry: Partial<InsertSitemap>): Promise<Sitemap | undefined> {
    const existingSitemapEntry = this.sitemapEntries.get(id);
    if (!existingSitemapEntry) {
      return undefined;
    }

    const updatedSitemapEntry = { 
      ...existingSitemapEntry, 
      ...sitemapEntry, 
      updatedAt: new Date() 
    };
    this.sitemapEntries.set(id, updatedSitemapEntry);
    return updatedSitemapEntry;
  }

  async deleteSitemapEntry(id: number): Promise<boolean> {
    return this.sitemapEntries.delete(id);
  }
}

export const storage = new MemStorage();
