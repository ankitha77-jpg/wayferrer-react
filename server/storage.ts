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
  getContentByPageId(pageId: string): Promise<{ section: Section; content: Content[] }[]>;
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

  async getContentByPageId(pageId: string): Promise<{ section: Section; content: Content[] }[]> {
    // Get all sections for the page, ordered by sort order
    const pageSections = await db.select().from(sections)
      .where(eq(sections.pageId, pageId))
      .orderBy(sections.sortOrder);

    // For each section, get its content
    const result = [];
    for (const section of pageSections) {
      const sectionContent = await db.select().from(content)
        .where(eq(content.sectionId, section.id))
        .orderBy(content.sortOrder);
      
      result.push({ section, content: sectionContent });
    }

    return result;
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