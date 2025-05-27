// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  properties;
  neighborhoods;
  developments;
  enquiries;
  agents;
  articles;
  bannerHighlights;
  developers;
  sitemapEntries;
  currentIds;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.properties = /* @__PURE__ */ new Map();
    this.neighborhoods = /* @__PURE__ */ new Map();
    this.developments = /* @__PURE__ */ new Map();
    this.enquiries = /* @__PURE__ */ new Map();
    this.agents = /* @__PURE__ */ new Map();
    this.articles = /* @__PURE__ */ new Map();
    this.bannerHighlights = /* @__PURE__ */ new Map();
    this.developers = /* @__PURE__ */ new Map();
    this.sitemapEntries = /* @__PURE__ */ new Map();
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
    this.initializeData();
  }
  initializeData() {
    this.createProperty({
      reference: "NS1503",
      listingType: "sale",
      propertyType: "villa",
      subCommunity: "Palm Jebel Ali",
      community: "Palm Jebel Ali",
      region: "Dubai",
      country: "AE",
      agent: [{ id: "5vWGNoSRuxte0DAU96KA", name: "Imran Shaikh" }],
      price: 1905e4,
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
      isDisabled: false
    });
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
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentIds.user++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Property methods
  async getProperties() {
    return Array.from(this.properties.values());
  }
  async getProperty(id) {
    return this.properties.get(id);
  }
  async getPropertyByReference(reference) {
    return Array.from(this.properties.values()).find(
      (property) => property.reference === reference
    );
  }
  async createProperty(property) {
    const id = this.currentIds.property++;
    const now = /* @__PURE__ */ new Date();
    const newProperty = {
      ...property,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }
  async updateProperty(id, property) {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) {
      return void 0;
    }
    const updatedProperty = {
      ...existingProperty,
      ...property,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }
  async deleteProperty(id) {
    return this.properties.delete(id);
  }
  // Neighborhood methods
  async getNeighborhoods() {
    return Array.from(this.neighborhoods.values());
  }
  async getNeighborhood(id) {
    return this.neighborhoods.get(id);
  }
  async createNeighborhood(neighborhood) {
    const id = this.currentIds.neighborhood++;
    const now = /* @__PURE__ */ new Date();
    const newNeighborhood = {
      ...neighborhood,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.neighborhoods.set(id, newNeighborhood);
    return newNeighborhood;
  }
  async updateNeighborhood(id, neighborhood) {
    const existingNeighborhood = this.neighborhoods.get(id);
    if (!existingNeighborhood) {
      return void 0;
    }
    const updatedNeighborhood = {
      ...existingNeighborhood,
      ...neighborhood,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.neighborhoods.set(id, updatedNeighborhood);
    return updatedNeighborhood;
  }
  async deleteNeighborhood(id) {
    return this.neighborhoods.delete(id);
  }
  // Development methods
  async getDevelopments() {
    return Array.from(this.developments.values());
  }
  async getDevelopment(id) {
    return this.developments.get(id);
  }
  async createDevelopment(development) {
    const id = this.currentIds.development++;
    const now = /* @__PURE__ */ new Date();
    const newDevelopment = {
      ...development,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.developments.set(id, newDevelopment);
    return newDevelopment;
  }
  async updateDevelopment(id, development) {
    const existingDevelopment = this.developments.get(id);
    if (!existingDevelopment) {
      return void 0;
    }
    const updatedDevelopment = {
      ...existingDevelopment,
      ...development,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.developments.set(id, updatedDevelopment);
    return updatedDevelopment;
  }
  async deleteDevelopment(id) {
    return this.developments.delete(id);
  }
  // Enquiry methods
  async getEnquiries() {
    return Array.from(this.enquiries.values());
  }
  async getEnquiry(id) {
    return this.enquiries.get(id);
  }
  async createEnquiry(enquiry) {
    const id = this.currentIds.enquiry++;
    const now = /* @__PURE__ */ new Date();
    const newEnquiry = {
      ...enquiry,
      id,
      isRead: false,
      createdAt: now
    };
    this.enquiries.set(id, newEnquiry);
    return newEnquiry;
  }
  async updateEnquiry(id, enquiry) {
    const existingEnquiry = this.enquiries.get(id);
    if (!existingEnquiry) {
      return void 0;
    }
    const updatedEnquiry = {
      ...existingEnquiry,
      ...enquiry
    };
    this.enquiries.set(id, updatedEnquiry);
    return updatedEnquiry;
  }
  async deleteEnquiry(id) {
    return this.enquiries.delete(id);
  }
  async markEnquiryAsRead(id) {
    const existingEnquiry = this.enquiries.get(id);
    if (!existingEnquiry) {
      return void 0;
    }
    const updatedEnquiry = {
      ...existingEnquiry,
      isRead: true
    };
    this.enquiries.set(id, updatedEnquiry);
    return updatedEnquiry;
  }
  // Agent methods
  async getAgents() {
    return Array.from(this.agents.values());
  }
  async getAgent(id) {
    return this.agents.get(id);
  }
  async createAgent(agent) {
    const id = this.currentIds.agent++;
    const now = /* @__PURE__ */ new Date();
    const newAgent = {
      ...agent,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.agents.set(id, newAgent);
    return newAgent;
  }
  async updateAgent(id, agent) {
    const existingAgent = this.agents.get(id);
    if (!existingAgent) {
      return void 0;
    }
    const updatedAgent = {
      ...existingAgent,
      ...agent,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }
  async deleteAgent(id) {
    return this.agents.delete(id);
  }
  // Article methods
  async getArticles() {
    return Array.from(this.articles.values());
  }
  async getArticle(id) {
    return this.articles.get(id);
  }
  async createArticle(article) {
    const id = this.currentIds.article++;
    const now = /* @__PURE__ */ new Date();
    const newArticle = {
      ...article,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.articles.set(id, newArticle);
    return newArticle;
  }
  async updateArticle(id, article) {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      return void 0;
    }
    const updatedArticle = {
      ...existingArticle,
      ...article,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }
  async deleteArticle(id) {
    return this.articles.delete(id);
  }
  // Banner Highlight methods
  async getBannerHighlights() {
    return Array.from(this.bannerHighlights.values());
  }
  async getBannerHighlight(id) {
    return this.bannerHighlights.get(id);
  }
  async createBannerHighlight(bannerHighlight) {
    const id = this.currentIds.bannerHighlight++;
    const now = /* @__PURE__ */ new Date();
    const newBannerHighlight = {
      ...bannerHighlight,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.bannerHighlights.set(id, newBannerHighlight);
    return newBannerHighlight;
  }
  async updateBannerHighlight(id, bannerHighlight) {
    const existingBannerHighlight = this.bannerHighlights.get(id);
    if (!existingBannerHighlight) {
      return void 0;
    }
    const updatedBannerHighlight = {
      ...existingBannerHighlight,
      ...bannerHighlight,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.bannerHighlights.set(id, updatedBannerHighlight);
    return updatedBannerHighlight;
  }
  async deleteBannerHighlight(id) {
    return this.bannerHighlights.delete(id);
  }
  // Developer methods
  async getDevelopers() {
    return Array.from(this.developers.values());
  }
  async getDeveloper(id) {
    return this.developers.get(id);
  }
  async createDeveloper(developer) {
    const id = this.currentIds.developer++;
    const now = /* @__PURE__ */ new Date();
    const newDeveloper = {
      ...developer,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.developers.set(id, newDeveloper);
    return newDeveloper;
  }
  async updateDeveloper(id, developer) {
    const existingDeveloper = this.developers.get(id);
    if (!existingDeveloper) {
      return void 0;
    }
    const updatedDeveloper = {
      ...existingDeveloper,
      ...developer,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.developers.set(id, updatedDeveloper);
    return updatedDeveloper;
  }
  async deleteDeveloper(id) {
    return this.developers.delete(id);
  }
  // Sitemap methods
  async getSitemapEntries() {
    return Array.from(this.sitemapEntries.values());
  }
  async getSitemapEntry(id) {
    return this.sitemapEntries.get(id);
  }
  async createSitemapEntry(sitemapEntry) {
    const id = this.currentIds.sitemap++;
    const now = /* @__PURE__ */ new Date();
    const newSitemapEntry = {
      ...sitemapEntry,
      id,
      updatedAt: now,
      createdAt: now
    };
    this.sitemapEntries.set(id, newSitemapEntry);
    return newSitemapEntry;
  }
  async updateSitemapEntry(id, sitemapEntry) {
    const existingSitemapEntry = this.sitemapEntries.get(id);
    if (!existingSitemapEntry) {
      return void 0;
    }
    const updatedSitemapEntry = {
      ...existingSitemapEntry,
      ...sitemapEntry,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.sitemapEntries.set(id, updatedSitemapEntry);
    return updatedSitemapEntry;
  }
  async deleteSitemapEntry(id) {
    return this.sitemapEntries.delete(id);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull(),
  listingType: text("listing_type").notNull(),
  propertyType: text("property_type").notNull(),
  subCommunity: text("sub_community"),
  community: text("community").notNull(),
  region: text("region").notNull(),
  country: text("country").notNull(),
  agent: jsonb("agent"),
  // JSON array of agent objects
  price: integer("price").notNull(),
  currency: text("currency").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  propertyStatus: text("property_status"),
  title: text("title").notNull(),
  description: text("description"),
  sqfeetArea: integer("sqfeet_area"),
  sqfeetBuiltup: integer("sqfeet_builtup"),
  isExclusive: boolean("is_exclusive").default(false),
  amenities: text("amenities"),
  isFeatured: boolean("is_featured").default(false),
  isFitted: boolean("is_fitted").default(false),
  isFurnished: boolean("is_furnished").default(false),
  lifestyle: text("lifestyle"),
  permit: text("permit"),
  brochure: text("brochure"),
  images: jsonb("images"),
  // JSON array of image URLs
  isDisabled: boolean("is_disabled").default(false),
  development: text("development"),
  neighbourhood: text("neighbourhood"),
  sold: boolean("sold").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var neighborhoods = pgTable("neighborhoods", {
  id: serial("id").primaryKey(),
  urlSlug: text("url_slug").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  region: text("region"),
  bannerImage: text("banner_image"),
  description: text("description"),
  locationAttributes: text("location_attributes"),
  address: text("address"),
  availableProperties: integer("available_properties"),
  images: jsonb("images"),
  // JSON array of image URLs
  neighbourImage: text("neighbour_image"),
  neighboursText: text("neighbours_text"),
  propertyOffers: text("property_offers"),
  subtitleBlurb: text("subtitle_blurb"),
  neighbourhoodDetails: text("neighbourhood_details"),
  neighbourhoodExpectation: text("neighbourhood_expectation"),
  brochure: text("brochure"),
  showOnFooter: boolean("show_on_footer").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var developments = pgTable("developments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  area: text("area"),
  propertyType: text("property_type"),
  propertyDescription: text("property_description"),
  price: integer("price"),
  urlSlug: text("url_slug").notNull(),
  images: jsonb("images"),
  // JSON array of image URLs
  maxBedrooms: integer("max_bedrooms"),
  minBedrooms: integer("min_bedrooms"),
  floors: integer("floors"),
  totalUnits: integer("total_units"),
  minArea: integer("min_area"),
  maxArea: integer("max_area"),
  address: text("address"),
  addressDescription: text("address_description"),
  currency: text("currency"),
  amenities: text("amenities"),
  subtitle: text("subtitle"),
  developerLink: text("developer_link"),
  neighbourhoodLink: text("neighbourhood_link"),
  featureOnHomepage: boolean("feature_on_homepage").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertDevelopmentSchema = createInsertSchema(developments).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  message: text("message"),
  name: text("name"),
  phone: text("phone"),
  propertyReference: text("property_reference"),
  subject: text("subject"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var insertEnquirySchema = createInsertSchema(enquiries).omit({
  id: true,
  isRead: true,
  createdAt: true
});
var agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  jobTitle: text("job_title"),
  languages: text("languages"),
  licenseNumber: text("license_number"),
  location: text("location"),
  name: text("name").notNull(),
  headShot: text("head_shot"),
  photo: text("photo"),
  email: text("email").notNull(),
  phone: text("phone"),
  introduction: text("introduction"),
  linkedin: text("linkedin"),
  experience: integer("experience"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  author: text("author"),
  category: text("category"),
  excerpt: text("excerpt"),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  datePublished: text("date_published"),
  readingTime: integer("reading_time"),
  externalId: text("external_id"),
  tileImage: text("tile_image"),
  inlineImages: jsonb("inline_images"),
  // JSON array of image URLs
  bodyStart: text("body_start"),
  bodyEnd: text("body_end"),
  isDisabled: boolean("is_disabled").default(false),
  isFeatured: boolean("is_featured").default(false),
  superFeature: boolean("super_feature").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var bannerHighlights = pgTable("banner_highlights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  headline: text("headline").notNull(),
  subheading: text("subheading"),
  cta: text("cta"),
  ctaLink: text("cta_link"),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertBannerHighlightSchema = createInsertSchema(bannerHighlights).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var developers = pgTable("developers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  urlSlug: text("url_slug").notNull(),
  country: text("country"),
  establishedSince: text("established_since"),
  logo: text("logo"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertDeveloperSchema = createInsertSchema(developers).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});
var sitemap = pgTable("sitemap", {
  id: serial("id").primaryKey(),
  completeUrl: text("complete_url").notNull(),
  linkLabel: text("link_label").notNull(),
  section: text("section"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSitemapSchema = createInsertSchema(sitemap).omit({
  id: true,
  updatedAt: true,
  createdAt: true
});

// server/routes.ts
function validateBody(schema, req, res) {
  try {
    return schema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    } else {
      res.status(400).json({ message: "Invalid request data" });
    }
    return null;
  }
}
async function registerRoutes(app2) {
  app2.get("/api/properties", async (_req, res) => {
    try {
      const properties2 = await storage.getProperties();
      res.json(properties2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });
  app2.post("/api/properties", async (req, res) => {
    const data = validateBody(insertPropertySchema, req, res);
    if (!data) return;
    try {
      const property = await storage.createProperty(data);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  app2.put("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertPropertySchema.partial(), req, res);
      if (!data) return;
      const property = await storage.updateProperty(id, data);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to update property" });
    }
  });
  app2.delete("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteProperty(id);
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property" });
    }
  });
  app2.get("/api/neighborhoods", async (_req, res) => {
    try {
      const neighborhoods2 = await storage.getNeighborhoods();
      res.json(neighborhoods2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });
  app2.get("/api/neighborhoods/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const neighborhood = await storage.getNeighborhood(id);
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhood" });
    }
  });
  app2.post("/api/neighborhoods", async (req, res) => {
    const data = validateBody(insertNeighborhoodSchema, req, res);
    if (!data) return;
    try {
      const neighborhood = await storage.createNeighborhood(data);
      res.status(201).json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to create neighborhood" });
    }
  });
  app2.put("/api/neighborhoods/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertNeighborhoodSchema.partial(), req, res);
      if (!data) return;
      const neighborhood = await storage.updateNeighborhood(id, data);
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to update neighborhood" });
    }
  });
  app2.delete("/api/neighborhoods/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteNeighborhood(id);
      if (!success) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete neighborhood" });
    }
  });
  app2.get("/api/developments", async (_req, res) => {
    try {
      const developments2 = await storage.getDevelopments();
      res.json(developments2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developments" });
    }
  });
  app2.get("/api/developments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const development = await storage.getDevelopment(id);
      if (!development) {
        return res.status(404).json({ message: "Development not found" });
      }
      res.json(development);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch development" });
    }
  });
  app2.post("/api/developments", async (req, res) => {
    const data = validateBody(insertDevelopmentSchema, req, res);
    if (!data) return;
    try {
      const development = await storage.createDevelopment(data);
      res.status(201).json(development);
    } catch (error) {
      res.status(500).json({ message: "Failed to create development" });
    }
  });
  app2.put("/api/developments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertDevelopmentSchema.partial(), req, res);
      if (!data) return;
      const development = await storage.updateDevelopment(id, data);
      if (!development) {
        return res.status(404).json({ message: "Development not found" });
      }
      res.json(development);
    } catch (error) {
      res.status(500).json({ message: "Failed to update development" });
    }
  });
  app2.delete("/api/developments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteDevelopment(id);
      if (!success) {
        return res.status(404).json({ message: "Development not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete development" });
    }
  });
  app2.get("/api/enquiries", async (_req, res) => {
    try {
      const enquiries2 = await storage.getEnquiries();
      res.json(enquiries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enquiries" });
    }
  });
  app2.get("/api/enquiries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const enquiry = await storage.getEnquiry(id);
      if (!enquiry) {
        return res.status(404).json({ message: "Enquiry not found" });
      }
      res.json(enquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enquiry" });
    }
  });
  app2.post("/api/enquiries", async (req, res) => {
    const data = validateBody(insertEnquirySchema, req, res);
    if (!data) return;
    try {
      const enquiry = await storage.createEnquiry(data);
      res.status(201).json(enquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to create enquiry" });
    }
  });
  app2.put("/api/enquiries/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const enquiry = await storage.markEnquiryAsRead(id);
      if (!enquiry) {
        return res.status(404).json({ message: "Enquiry not found" });
      }
      res.json(enquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark enquiry as read" });
    }
  });
  app2.delete("/api/enquiries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteEnquiry(id);
      if (!success) {
        return res.status(404).json({ message: "Enquiry not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete enquiry" });
    }
  });
  app2.get("/api/agents", async (_req, res) => {
    try {
      const agents2 = await storage.getAgents();
      res.json(agents2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });
  app2.get("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const agent = await storage.getAgent(id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });
  app2.post("/api/agents", async (req, res) => {
    const data = validateBody(insertAgentSchema, req, res);
    if (!data) return;
    try {
      const agent = await storage.createAgent(data);
      res.status(201).json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to create agent" });
    }
  });
  app2.put("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertAgentSchema.partial(), req, res);
      if (!data) return;
      const agent = await storage.updateAgent(id, data);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update agent" });
    }
  });
  app2.delete("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteAgent(id);
      if (!success) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete agent" });
    }
  });
  app2.get("/api/articles", async (_req, res) => {
    try {
      const articles2 = await storage.getArticles();
      res.json(articles2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  app2.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  app2.post("/api/articles", async (req, res) => {
    const data = validateBody(insertArticleSchema, req, res);
    if (!data) return;
    try {
      const article = await storage.createArticle(data);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to create article" });
    }
  });
  app2.put("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertArticleSchema.partial(), req, res);
      if (!data) return;
      const article = await storage.updateArticle(id, data);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to update article" });
    }
  });
  app2.delete("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteArticle(id);
      if (!success) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });
  app2.get("/api/banner-highlights", async (_req, res) => {
    try {
      const bannerHighlights2 = await storage.getBannerHighlights();
      res.json(bannerHighlights2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch banner highlights" });
    }
  });
  app2.get("/api/banner-highlights/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const bannerHighlight = await storage.getBannerHighlight(id);
      if (!bannerHighlight) {
        return res.status(404).json({ message: "Banner highlight not found" });
      }
      res.json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch banner highlight" });
    }
  });
  app2.post("/api/banner-highlights", async (req, res) => {
    const data = validateBody(insertBannerHighlightSchema, req, res);
    if (!data) return;
    try {
      const bannerHighlight = await storage.createBannerHighlight(data);
      res.status(201).json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to create banner highlight" });
    }
  });
  app2.put("/api/banner-highlights/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertBannerHighlightSchema.partial(), req, res);
      if (!data) return;
      const bannerHighlight = await storage.updateBannerHighlight(id, data);
      if (!bannerHighlight) {
        return res.status(404).json({ message: "Banner highlight not found" });
      }
      res.json(bannerHighlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to update banner highlight" });
    }
  });
  app2.delete("/api/banner-highlights/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteBannerHighlight(id);
      if (!success) {
        return res.status(404).json({ message: "Banner highlight not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete banner highlight" });
    }
  });
  app2.get("/api/developers", async (_req, res) => {
    try {
      const developers2 = await storage.getDevelopers();
      res.json(developers2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developers" });
    }
  });
  app2.get("/api/developers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const developer = await storage.getDeveloper(id);
      if (!developer) {
        return res.status(404).json({ message: "Developer not found" });
      }
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developer" });
    }
  });
  app2.post("/api/developers", async (req, res) => {
    const data = validateBody(insertDeveloperSchema, req, res);
    if (!data) return;
    try {
      const developer = await storage.createDeveloper(data);
      res.status(201).json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to create developer" });
    }
  });
  app2.put("/api/developers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertDeveloperSchema.partial(), req, res);
      if (!data) return;
      const developer = await storage.updateDeveloper(id, data);
      if (!developer) {
        return res.status(404).json({ message: "Developer not found" });
      }
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to update developer" });
    }
  });
  app2.delete("/api/developers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteDeveloper(id);
      if (!success) {
        return res.status(404).json({ message: "Developer not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete developer" });
    }
  });
  app2.get("/api/sitemap", async (_req, res) => {
    try {
      const sitemapEntries = await storage.getSitemapEntries();
      res.json(sitemapEntries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sitemap entries" });
    }
  });
  app2.get("/api/sitemap/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const sitemapEntry = await storage.getSitemapEntry(id);
      if (!sitemapEntry) {
        return res.status(404).json({ message: "Sitemap entry not found" });
      }
      res.json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sitemap entry" });
    }
  });
  app2.post("/api/sitemap", async (req, res) => {
    const data = validateBody(insertSitemapSchema, req, res);
    if (!data) return;
    try {
      const sitemapEntry = await storage.createSitemapEntry(data);
      res.status(201).json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: "Failed to create sitemap entry" });
    }
  });
  app2.put("/api/sitemap/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const data = validateBody(insertSitemapSchema.partial(), req, res);
      if (!data) return;
      const sitemapEntry = await storage.updateSitemapEntry(id, data);
      if (!sitemapEntry) {
        return res.status(404).json({ message: "Sitemap entry not found" });
      }
      res.json(sitemapEntry);
    } catch (error) {
      res.status(500).json({ message: "Failed to update sitemap entry" });
    }
  });
  app2.delete("/api/sitemap/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const success = await storage.deleteSitemapEntry(id);
      if (!success) {
        return res.status(404).json({ message: "Sitemap entry not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete sitemap entry" });
    }
  });
  app2.get("/api/export/:entity", async (req, res) => {
    try {
      const entity = req.params.entity;
      let data;
      switch (entity) {
        case "properties":
          data = await storage.getProperties();
          break;
        case "neighborhoods":
          data = await storage.getNeighborhoods();
          break;
        case "developments":
          data = await storage.getDevelopments();
          break;
        case "enquiries":
          data = await storage.getEnquiries();
          break;
        case "agents":
          data = await storage.getAgents();
          break;
        case "articles":
          data = await storage.getArticles();
          break;
        case "bannerHighlights":
          data = await storage.getBannerHighlights();
          break;
        case "developers":
          data = await storage.getDevelopers();
          break;
        case "sitemap":
          data = await storage.getSitemapEntries();
          break;
        default:
          return res.status(400).json({ message: "Invalid entity type" });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to export data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
