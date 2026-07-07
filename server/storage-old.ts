import { 
  type User, type InsertUser, 
  type Destination, type InsertDestination, 
  type Trip, type InsertTrip, 
  type BlogPost, type InsertBlogPost, 
  type Booking, type InsertBooking, 
  type Consultation, type InsertConsultation, 
  type Contact, type InsertContact, 
  type Newsletter, type InsertNewsletter,
  type Page, type InsertPage,
  type Section, type InsertSection,
  type Content, type InsertContent,
  type AdminUser, type InsertAdminUser,
  users, destinations, trips, blogPosts, bookings, consultations, contacts, newsletter,
  pages, sections, content, adminUsers
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Trips
  getTrips(): Promise<Trip[]>;
  getTrip(id: string): Promise<Trip | undefined>;
  getActiveTrips(): Promise<Trip[]>;
  createTrip(trip: InsertTrip): Promise<Trip>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Consultations
  getConsultations(): Promise<Consultation[]>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Newsletter
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;

  // CMS - Pages
  getPages(): Promise<Page[]>;
  getPage(id: string): Promise<Page | undefined>;
  getPageByName(name: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;

  // CMS - Sections
  getSections(): Promise<Section[]>;
  getSectionsByPageId(pageId: string): Promise<Section[]>;
  getSection(id: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
  updateSection(id: string, section: Partial<InsertSection>): Promise<Section>;

  // CMS - Content
  getContent(): Promise<Content[]>;
  getContentBySectionId(sectionId: string): Promise<Content[]>;
  getContentItem(id: string): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: string, content: Partial<InsertContent>): Promise<Content>;
  deleteContent(id: string): Promise<void>;

  // CMS - Admin Users
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Database storage uses the db connection from db.ts
  }

  private seedData() {
    // Seed destinations
    const destinations: InsertDestination[] = [
      {
        name: "Madagascar",
        country: "Madagascar",
        continent: "Africa",
        description: "Embark on a captivating journey through Madagascar, where you'll explore the island's unique wildlife, lush landscapes, and vibrant culture. Experience the haunting calls of Indri Indri lemurs in Andasibe National Park.",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        difficulty: "Moderate",
        bestTimeToVisit: "April-November",
        isOffbeat: true,
        guidePrice: "12.99",
        highlights: ["Indri Indri lemurs", "Andasibe National Park", "Unique wildlife", "Baobab trees", "Local culture"]
      },
      {
        name: "Socotra Island",
        country: "Yemen",
        continent: "Asia",
        description: "Discover the alien-like landscapes of Socotra Island, home to endemic species found nowhere else on Earth. Often called the 'Galapagos of the Indian Ocean'.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "Challenging",
        bestTimeToVisit: "October-April",
        isOffbeat: true,
        guidePrice: "15.99",
        highlights: ["Dragon's Blood Trees", "Pristine beaches", "Endemic species", "Untouched nature"]
      },
      {
        name: "Faroe Islands",
        country: "Faroe Islands",
        continent: "Europe",
        description: "Experience the dramatic landscapes of the Faroe Islands with their grass-roof houses, stunning cliffs, and Nordic culture.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        difficulty: "Moderate",
        bestTimeToVisit: "May-September",
        isOffbeat: true,
        guidePrice: "11.99",
        highlights: ["Dramatic cliffs", "Traditional villages", "Puffins", "Nordic culture"]
      }
    ];

    destinations.forEach(dest => this.createDestination(dest));

    // Seed trips
    const trips: InsertTrip[] = [
      {
        destinationId: Array.from(this.destinations.keys())[0],
        title: "Madagascar Wildlife Adventure",
        description: "10-day expedition through Madagascar's most remote national parks and reserves. Encounter endemic lemurs, chameleons, and witness the island's incredible biodiversity.",
        price: "2000.00",
        duration: "10 Days",
        groupSize: "8-12 People",
        difficulty: "Moderate",
        startDate: new Date("2025-03-15"),
        endDate: new Date("2025-03-25"),
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isActive: true,
        spotsAvailable: 8,
        totalSpots: 12
      },
      {
        destinationId: Array.from(this.destinations.keys())[1],
        title: "Socotra Island Expedition",
        description: "Explore the most isolated and unique island on Earth. Discover endemic plants and animals found nowhere else.",
        price: "2800.00",
        duration: "12 Days",
        groupSize: "6-10 People",
        difficulty: "Challenging",
        startDate: new Date("2025-04-10"),
        endDate: new Date("2025-04-22"),
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isActive: true,
        spotsAvailable: 6,
        totalSpots: 10
      }
    ];

    trips.forEach(trip => this.createTrip(trip));

    // Seed blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "Unforgettable Glamping Domes in Europe",
        excerpt: "Think glamping is just camping without the dirt? Think again. Discover 5 epic glamping dome stays across Europe that combine comfort, design, and wild landscapes for a truly unique outdoor experience.",
        content: "Full blog content here...",
        imageUrl: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Europe",
        readTime: "3 min read",
        isPublished: true
      },
      {
        title: "Mauritius Road Trip Itinerary: A 5-Day Nature-Filled Escape",
        excerpt: "Cruise Mauritius' coast, chase waterfalls, and find hidden gems. Scenic roads, epic stops—this road trip is pure island magic!",
        content: "Full blog content here...",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Africa",
        readTime: "7 min read",
        isPublished: true
      },
      {
        title: "Top 10 Smart Travel Tips for Beginners",
        excerpt: "First-time trips can be both thrilling and horrifying. The fun part of exploring new places, meeting new faces, and witnessing many...",
        content: "Full blog content here...",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Travel Tips",
        readTime: "4 min read",
        isPublished: true
      }
    ];

    blogPosts.forEach(post => this.createBlogPost(post));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { 
      ...insertDestination, 
      id, 
      createdAt: new Date() 
    };
    this.destinations.set(id, destination);
    return destination;
  }

  // Trips
  async getTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values());
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async getActiveTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(trip => trip.isActive);
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = randomUUID();
    const trip: Trip = { 
      ...insertTrip, 
      id, 
      createdAt: new Date() 
    };
    this.trips.set(id, trip);
    return trip;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      createdAt: new Date() 
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  // Consultations
  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = randomUUID();
    const consultation: Consultation = { 
      ...insertConsultation, 
      id, 
      createdAt: new Date() 
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Newsletter
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletter.values());
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      createdAt: new Date() 
    };
    this.newsletter.set(id, newsletter);
    return newsletter;
  }
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
    return destination || undefined;
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const [destination] = await db.insert(destinations).values(insertDestination).returning();
    return destination;
  }

  // Trips
  async getTrips(): Promise<Trip[]> {
    return await db.select().from(trips);
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    const [trip] = await db.select().from(trips).where(eq(trips.id, id));
    return trip || undefined;
  }

  async getActiveTrips(): Promise<Trip[]> {
    return await db.select().from(trips).where(eq(trips.isActive, true));
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const [trip] = await db.insert(trips).values(insertTrip).returning();
    return trip;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return blogPost || undefined;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return blogPost;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  // Consultations
  async getConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db.insert(consultations).values(insertConsultation).returning();
    return consultation;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  // Newsletter
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db.select().from(newsletter);
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [subscription] = await db.insert(newsletter).values(insertNewsletter).returning();
    return subscription;
  }

  // CMS - Pages
  async getPages(): Promise<Page[]> {
    return await db.select().from(pages).orderBy(pages.name);
  }

  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageByName(name: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.name, name));
    return page || undefined;
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const [page] = await db.insert(pages).values(insertPage).returning();
    return page;
  }

  async updatePage(id: string, updateData: Partial<InsertPage>): Promise<Page> {
    const [page] = await db.update(pages)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return page;
  }

  // CMS - Sections
  async getSections(): Promise<Section[]> {
    return await db.select().from(sections).orderBy(sections.sortOrder);
  }

  async getSectionsByPageId(pageId: string): Promise<Section[]> {
    return await db.select().from(sections)
      .where(eq(sections.pageId, pageId))
      .orderBy(sections.sortOrder);
  }

  async getSection(id: string): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.id, id));
    return section || undefined;
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db.insert(sections).values(insertSection).returning();
    return section;
  }

  async updateSection(id: string, updateData: Partial<InsertSection>): Promise<Section> {
    const [section] = await db.update(sections)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(sections.id, id))
      .returning();
    return section;
  }

  // CMS - Content
  async getContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(content.sortOrder);
  }

  async getContentBySectionId(sectionId: string): Promise<Content[]> {
    return await db.select().from(content)
      .where(eq(content.sectionId, sectionId))
      .orderBy(content.sortOrder);
  }

  async getContentItem(id: string): Promise<Content | undefined> {
    const [contentItem] = await db.select().from(content).where(eq(content.id, id));
    return contentItem || undefined;
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [contentItem] = await db.insert(content).values(insertContent).returning();
    return contentItem;
  }

  async updateContent(id: string, updateData: Partial<InsertContent>): Promise<Content> {
    const [contentItem] = await db.update(content)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return contentItem;
  }

  async deleteContent(id: string): Promise<void> {
    await db.delete(content).where(eq(content.id, id));
  }

  // CMS - Admin Users
  async getAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers);
  }

  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return user || undefined;
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db.insert(adminUsers).values(insertAdminUser).returning();
    return user;
  }

  async updateAdminUser(id: string, updateData: Partial<InsertAdminUser>): Promise<AdminUser> {
    const [user] = await db.update(adminUsers)
      .set(updateData)
      .where(eq(adminUsers.id, id))
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
