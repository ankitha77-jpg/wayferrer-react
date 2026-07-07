import { db } from "./db";
import { pages, sections, content, adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedCMSData() {
  try {
    console.log("Starting CMS data seeding...");

    // Create default admin user
    const adminEmail = "admin@wayfarerfootprints.com";
    const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.email, adminEmail));
    
    if (existingAdmin.length === 0) {
      await db.insert(adminUsers).values({
        email: adminEmail,
        password: "admin123", // In production, this should be hashed
        name: "CMS Admin",
        role: "admin",
        isActive: true,
      });
      console.log("Admin user created");
    }

    // Create pages
    const pageData = [
      {
        name: "home",
        title: "Home Page",
        metaDescription: "Welcome to Wayfarer Footprints - Your trusted travel companion",
        isActive: true,
      },
      {
        name: "about",
        title: "About Page",
        metaDescription: "Learn about Ankitha's travel journey and expertise",
        isActive: true,
      },
      {
        name: "destinations",
        title: "Destinations Page",
        metaDescription: "Discover offbeat travel destinations around the world",
        isActive: true,
      },
      {
        name: "trips",
        title: "Trips Page",
        metaDescription: "Join curated group trips to amazing destinations",
        isActive: true,
      },
      {
        name: "blog",
        title: "Blog Page",
        metaDescription: "Travel stories, tips, and destination guides",
        isActive: true,
      },
      {
        name: "contact",
        title: "Contact Page",
        metaDescription: "Get in touch for travel consultations and inquiries",
        isActive: true,
      },
    ];

    const createdPages = [];
    for (const pageInfo of pageData) {
      const existingPage = await db.select().from(pages).where(eq(pages.name, pageInfo.name));
      if (existingPage.length === 0) {
        const [page] = await db.insert(pages).values(pageInfo).returning();
        createdPages.push(page);
        console.log(`Page created: ${pageInfo.title}`);
      } else {
        createdPages.push(existingPage[0]);
      }
    }

    // Create sections for Home page
    const homePage = createdPages.find(p => p.name === "home");
    if (homePage) {
      const homeSections = [
        {
          pageId: homePage.id,
          name: "hero",
          displayName: "Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: homePage.id,
          name: "stats",
          displayName: "Statistics Section",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: homePage.id,
          name: "featured_destinations",
          displayName: "Featured Destinations",
          sortOrder: 3,
          isActive: true,
        },
        {
          pageId: homePage.id,
          name: "digital_products",
          displayName: "Digital Products Section",
          sortOrder: 4,
          isActive: true,
        },
      ];

      const createdSections = [];
      for (const sectionInfo of homeSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          createdSections.push(section);
          console.log(`Section created: ${sectionInfo.displayName}`);
        } else {
          createdSections.push(existingSection[0]);
        }
      }

      // Create content for Hero section
      const heroSection = createdSections.find(s => s.name === "hero");
      if (heroSection) {
        const heroContent = [
          {
            sectionId: heroSection.id,
            type: "heading",
            key: "main_title",
            value: "Turn Your Limited Vacation Days Into Extraordinary Adventures",
            displayName: "Main Hero Title",
            sortOrder: 1,
          },
          {
            sectionId: heroSection.id,
            type: "paragraph",
            key: "hero_description",
            value: "I've been to 109 countries while maintaining my full-time marketing career. Let me show you how to maximize your vacation time and budget to experience the world's most incredible destinations.",
            displayName: "Hero Description",
            sortOrder: 2,
          },
          {
            sectionId: heroSection.id,
            type: "image",
            key: "hero_background",
            value: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            displayName: "Hero Background Image",
            sortOrder: 3,
          },
          {
            sectionId: heroSection.id,
            type: "button",
            key: "cta_text",
            value: "Start Your Journey",
            displayName: "Call to Action Button Text",
            sortOrder: 4,
          },
        ];

        for (const contentInfo of heroContent) {
          const existingContent = await db.select().from(content)
            .where(eq(content.key, contentInfo.key));
          if (existingContent.length === 0) {
            await db.insert(content).values(contentInfo);
            console.log(`Content created: ${contentInfo.displayName}`);
          }
        }
      }

      // Create content for Stats section
      const statsSection = createdSections.find(s => s.name === "stats");
      if (statsSection) {
        const statsContent = [
          {
            sectionId: statsSection.id,
            type: "text",
            key: "countries_count",
            value: "109",
            displayName: "Countries Visited Count",
            sortOrder: 1,
          },
          {
            sectionId: statsSection.id,
            type: "text",
            key: "countries_label",
            value: "Countries Visited",
            displayName: "Countries Label",
            sortOrder: 2,
          },
          {
            sectionId: statsSection.id,
            type: "text",
            key: "trips_count",
            value: "50+",
            displayName: "Trips Organized Count",
            sortOrder: 3,
          },
          {
            sectionId: statsSection.id,
            type: "text",
            key: "trips_label",
            value: "Trips Organized",
            displayName: "Trips Label",
            sortOrder: 4,
          },
          {
            sectionId: statsSection.id,
            type: "text",
            key: "travelers_count",
            value: "500+",
            displayName: "Happy Travelers Count",
            sortOrder: 5,
          },
          {
            sectionId: statsSection.id,
            type: "text",
            key: "travelers_label",
            value: "Happy Travelers",
            displayName: "Travelers Label",
            sortOrder: 6,
          },
        ];

        for (const contentInfo of statsContent) {
          const existingContent = await db.select().from(content)
            .where(eq(content.key, contentInfo.key));
          if (existingContent.length === 0) {
            await db.insert(content).values(contentInfo);
            console.log(`Content created: ${contentInfo.displayName}`);
          }
        }
      }
    }

    // Create sections for About page
    const aboutPage = createdPages.find(p => p.name === "about");
    if (aboutPage) {
      const aboutSections = [
        {
          pageId: aboutPage.id,
          name: "hero",
          displayName: "About Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: aboutPage.id,
          name: "story",
          displayName: "My Story Section",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: aboutPage.id,
          name: "achievements",
          displayName: "Achievements Section",
          sortOrder: 3,
          isActive: true,
        },
      ];

      const aboutCreatedSections = [];
      for (const sectionInfo of aboutSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          aboutCreatedSections.push(section);
          console.log(`Section created: ${sectionInfo.displayName}`);
        } else {
          aboutCreatedSections.push(existingSection[0]);
        }
      }

      // Create content for About Hero section
      const aboutHeroSection = aboutCreatedSections.find(s => s.name === "hero");
      if (aboutHeroSection) {
        const aboutHeroContent = [
          {
            sectionId: aboutHeroSection.id,
            type: "heading",
            key: "about_title",
            value: "Hi, I'm Ankitha!",
            displayName: "About Page Title",
            sortOrder: 1,
          },
          {
            sectionId: aboutHeroSection.id,
            type: "paragraph",
            key: "about_intro",
            value: "A marketing strategist by day and passionate traveler by heart. I've mastered the art of exploring the world while maintaining a successful full-time career.",
            displayName: "About Introduction",
            sortOrder: 2,
          },
          {
            sectionId: aboutHeroSection.id,
            type: "image",
            key: "profile_image",
            value: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
            displayName: "Profile Image",
            sortOrder: 3,
          },
        ];

        for (const contentInfo of aboutHeroContent) {
          const existingContent = await db.select().from(content)
            .where(eq(content.key, contentInfo.key));
          if (existingContent.length === 0) {
            await db.insert(content).values(contentInfo);
            console.log(`Content created: ${contentInfo.displayName}`);
          }
        }
      }
    }

    // Create comprehensive sections for all other pages
    const destinationsPage = createdPages.find(p => p.name === "destinations");
    if (destinationsPage) {
      const destinationsSections = [
        {
          pageId: destinationsPage.id,
          name: "hero",
          displayName: "Destinations Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: destinationsPage.id,
          name: "featured",
          displayName: "Featured Destinations",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: destinationsPage.id,
          name: "filters",
          displayName: "Filter Options",
          sortOrder: 3,
          isActive: true,
        },
      ];

      for (const sectionInfo of destinationsSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          console.log(`Section created: ${sectionInfo.displayName}`);
          
          // Add content for destinations hero
          if (section.name === "hero") {
            const destinationsHeroContent = [
              {
                sectionId: section.id,
                type: "heading",
                key: "destinations_title",
                value: "Discover Offbeat Destinations",
                displayName: "Destinations Page Title",
                sortOrder: 1,
              },
              {
                sectionId: section.id,
                type: "paragraph",
                key: "destinations_description",
                value: "Explore my curated collection of hidden gems and offbeat destinations that will transform your travel experience.",
                displayName: "Destinations Description",
                sortOrder: 2,
              },
            ];

            for (const contentInfo of destinationsHeroContent) {
              const existingContent = await db.select().from(content)
                .where(eq(content.key, contentInfo.key));
              if (existingContent.length === 0) {
                await db.insert(content).values(contentInfo);
                console.log(`Content created: ${contentInfo.displayName}`);
              }
            }
          }
        }
      }
    }

    // Create sections for Trips page
    const tripsPage = createdPages.find(p => p.name === "trips");
    if (tripsPage) {
      const tripsSections = [
        {
          pageId: tripsPage.id,
          name: "hero",
          displayName: "Trips Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: tripsPage.id,
          name: "upcoming",
          displayName: "Upcoming Trips",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: tripsPage.id,
          name: "testimonials",
          displayName: "Customer Testimonials",
          sortOrder: 3,
          isActive: true,
        },
      ];

      for (const sectionInfo of tripsSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          console.log(`Section created: ${sectionInfo.displayName}`);
          
          if (section.name === "hero") {
            const tripsHeroContent = [
              {
                sectionId: section.id,
                type: "heading",
                key: "trips_title",
                value: "Join Our Group Adventures",
                displayName: "Trips Page Title",
                sortOrder: 1,
              },
              {
                sectionId: section.id,
                type: "paragraph",
                key: "trips_description",
                value: "Experience the world with like-minded travelers on our carefully curated group trips to extraordinary destinations.",
                displayName: "Trips Description",
                sortOrder: 2,
              },
            ];

            for (const contentInfo of tripsHeroContent) {
              const existingContent = await db.select().from(content)
                .where(eq(content.key, contentInfo.key));
              if (existingContent.length === 0) {
                await db.insert(content).values(contentInfo);
                console.log(`Content created: ${contentInfo.displayName}`);
              }
            }
          }
        }
      }
    }

    // Create sections for Blog page
    const blogPage = createdPages.find(p => p.name === "blog");
    if (blogPage) {
      const blogSections = [
        {
          pageId: blogPage.id,
          name: "hero",
          displayName: "Blog Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: blogPage.id,
          name: "featured",
          displayName: "Featured Articles",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: blogPage.id,
          name: "categories",
          displayName: "Blog Categories",
          sortOrder: 3,
          isActive: true,
        },
      ];

      for (const sectionInfo of blogSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          console.log(`Section created: ${sectionInfo.displayName}`);
          
          if (section.name === "hero") {
            const blogHeroContent = [
              {
                sectionId: section.id,
                type: "heading",
                key: "blog_title",
                value: "Travel Stories & Guides",
                displayName: "Blog Page Title",
                sortOrder: 1,
              },
              {
                sectionId: section.id,
                type: "paragraph",
                key: "blog_description",
                value: "Discover insider tips, destination guides, and inspiring travel stories from my journeys to 109 countries.",
                displayName: "Blog Description",
                sortOrder: 2,
              },
            ];

            for (const contentInfo of blogHeroContent) {
              const existingContent = await db.select().from(content)
                .where(eq(content.key, contentInfo.key));
              if (existingContent.length === 0) {
                await db.insert(content).values(contentInfo);
                console.log(`Content created: ${contentInfo.displayName}`);
              }
            }
          }
        }
      }
    }

    // Create sections for Contact page
    const contactPage = createdPages.find(p => p.name === "contact");
    if (contactPage) {
      const contactSections = [
        {
          pageId: contactPage.id,
          name: "hero",
          displayName: "Contact Hero Section",
          sortOrder: 1,
          isActive: true,
        },
        {
          pageId: contactPage.id,
          name: "services",
          displayName: "Services Section",
          sortOrder: 2,
          isActive: true,
        },
        {
          pageId: contactPage.id,
          name: "contact_info",
          displayName: "Contact Information",
          sortOrder: 3,
          isActive: true,
        },
      ];

      for (const sectionInfo of contactSections) {
        const existingSection = await db.select().from(sections)
          .where(eq(sections.name, sectionInfo.name));
        if (existingSection.length === 0) {
          const [section] = await db.insert(sections).values(sectionInfo).returning();
          console.log(`Section created: ${sectionInfo.displayName}`);
          
          if (section.name === "hero") {
            const contactHeroContent = [
              {
                sectionId: section.id,
                type: "heading",
                key: "contact_title",
                value: "Let's Plan Your Next Adventure",
                displayName: "Contact Page Title",
                sortOrder: 1,
              },
              {
                sectionId: section.id,
                type: "paragraph",
                key: "contact_description",
                value: "Ready to explore the world? Get in touch for personalized travel consultations and trip planning services.",
                displayName: "Contact Description",
                sortOrder: 2,
              },
            ];

            for (const contentInfo of contactHeroContent) {
              const existingContent = await db.select().from(content)
                .where(eq(content.key, contentInfo.key));
              if (existingContent.length === 0) {
                await db.insert(content).values(contentInfo);
                console.log(`Content created: ${contentInfo.displayName}`);
              }
            }
          }
        }
      }
    }

    console.log("CMS data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding CMS data:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCMSData()
    .then(() => {
      console.log("Seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}