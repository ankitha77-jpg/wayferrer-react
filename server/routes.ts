import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingSchema, insertConsultationSchema, insertContactSchema, insertNewsletterSchema,
  insertPageSchema, insertSectionSchema, insertContentSchema, insertAdminUserSchema
} from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

const NOTIFICATION_EMAIL = "ankitha77@gmail.com";

async function sendNotificationEmail(subject: string, htmlBody: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`[Email Notification] ${subject}`);
      console.log(`[Email Notification] SMTP not configured - storing subscription only`);
      console.log(`[Email Notification] Body: ${htmlBody.replace(/<[^>]*>/g, '')}`);
      return;
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: NOTIFICATION_EMAIL,
      subject,
      html: htmlBody,
    });
    console.log(`[Email Notification] Sent: ${subject}`);
  } catch (error) {
    console.error("[Email Notification] Failed to send:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Trips
  app.get("/api/trips", async (req, res) => {
    try {
      const trips = await storage.getActiveTrips();
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trips" });
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const trip = await storage.getTrip(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip" });
    }
  });

  // Blog Posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post || !post.isPublished) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Consultations
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.status(201).json(consultation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid consultation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create consultation" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);

      const details = [];
      if (validatedData.email) details.push(`<strong>Email:</strong> ${validatedData.email}`);
      if (validatedData.whatsappNumber) details.push(`<strong>WhatsApp:</strong> ${validatedData.whatsappNumber}`);
      if (validatedData.subscribeNewsletter) details.push("Subscribed to Email Newsletter");
      if (validatedData.subscribeWhatsapp) details.push("Joined WhatsApp Community");

      sendNotificationEmail(
        "New Subscriber on Wayfarer Footprints!",
        `<h2>New Community Member</h2><p>${details.join("<br/>")}</p><p style="color:#888;font-size:12px;">Sent from your Wayfarer Footprints website</p>`
      );

      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid newsletter data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create newsletter subscription" });
    }
  });

  app.get("/api/newsletter/export.csv", async (req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      const header = "Email,WhatsApp Number,Subscribed Newsletter,Subscribed WhatsApp,Created At\n";
      const rows = subscribers.map(s => 
        `"${s.email || ''}","${s.whatsappNumber || ''}","${s.subscribeNewsletter ? 'Yes' : 'No'}","${s.subscribeWhatsapp ? 'Yes' : 'No'}","${s.createdAt || ''}"`
      ).join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=newsletter_subscribers.csv");
      res.send(header + rows);
    } catch (error) {
      res.status(500).json({ message: "Failed to export subscribers" });
    }
  });

  // CMS API Routes
  // Pages
  app.get("/api/cms/pages", async (req, res) => {
    try {
      const pages = await storage.getPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  app.get("/api/cms/pages/:id", async (req, res) => {
    try {
      const page = await storage.getPage(req.params.id);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.get("/api/cms/pages/name/:name", async (req, res) => {
    try {
      const page = await storage.getPageByName(req.params.name);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.post("/api/cms/pages", async (req, res) => {
    try {
      const validatedData = insertPageSchema.parse(req.body);
      const page = await storage.createPage(validatedData);
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create page" });
    }
  });

  app.put("/api/cms/pages/:id", async (req, res) => {
    try {
      const validatedData = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(req.params.id, validatedData);
      res.json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update page" });
    }
  });

  // Sections
  app.get("/api/cms/sections", async (req, res) => {
    try {
      const sections = await storage.getSections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sections" });
    }
  });

  app.get("/api/cms/sections/page/:pageId", async (req, res) => {
    try {
      const sections = await storage.getSectionsByPageId(req.params.pageId);
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sections" });
    }
  });

  app.post("/api/cms/sections", async (req, res) => {
    try {
      const validatedData = insertSectionSchema.parse(req.body);
      const section = await storage.createSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid section data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create section" });
    }
  });

  app.put("/api/cms/sections/:id", async (req, res) => {
    try {
      const validatedData = insertSectionSchema.partial().parse(req.body);
      const section = await storage.updateSection(req.params.id, validatedData);
      res.json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid section data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update section" });
    }
  });

  // Content
  app.get("/api/cms/content", async (req, res) => {
    try {
      const content = await storage.getContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/cms/content/section/:sectionId", async (req, res) => {
    try {
      const content = await storage.getContentBySectionId(req.params.sectionId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/cms/content/page/:pageId", async (req, res) => {
    try {
      const pageContent = await storage.getContentByPageId(req.params.pageId);
      res.json(pageContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });

  app.post("/api/cms/content", async (req, res) => {
    try {
      const validatedData = insertContentSchema.parse(req.body);
      const content = await storage.createContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create content" });
    }
  });

  app.put("/api/cms/content/:id", async (req, res) => {
    try {
      const validatedData = insertContentSchema.partial().parse(req.body);
      const content = await storage.updateContent(req.params.id, validatedData);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  app.delete("/api/cms/content/:id", async (req, res) => {
    try {
      await storage.deleteContent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete content" });
    }
  });

  // Admin Users
  app.get("/api/cms/admin-users", async (req, res) => {
    try {
      const users = await storage.getAdminUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin users" });
    }
  });

  app.post("/api/cms/admin-users", async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      const user = await storage.createAdminUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid admin user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create admin user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
