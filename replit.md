# Travel Website - Wayfarer Footprints

## Overview

This is a full-stack travel website for Ankitha Rajendaran (Wayfarer Footprints), a travel blogger and curator who shares offbeat destination guides and organizes group trips. The application showcases destinations, manages trip bookings, handles consultations, and features a travel blog.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction layer
│   └── vite.ts            # Development server setup
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and Zod validations
└── migrations/            # Database migration files
```

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and user management
- **Destinations**: Travel destination information with metadata
- **Trips**: Organized group trips linked to destinations
- **Blog Posts**: Travel articles and guides
- **Bookings**: Trip reservation management
- **Consultations**: Travel consultation requests
- **Contacts**: General contact form submissions
- **Newsletter**: Email subscription management

### CMS System (Latest Addition)
- **Pages**: Website page management (Home, About, Destinations, etc.)
- **Sections**: Page sections for organizing content
- **Content**: Individual content pieces with types (text, heading, paragraph, image, button)
- **Admin Users**: CMS administrator management

### Inline Editing System (Latest Addition)
- **EditModeContext**: React context for managing edit mode state
- **InlineEdit Component**: Click-to-edit functionality for content
- **EditModeToggle**: Navigation button to enable/disable editing
- **Real-time Updates**: Instant content saving and display

### Image Management System (Latest Addition)
- **Centralized Images**: All images managed through `/client/src/lib/images.ts`
- **Client-Friendly Structure**: Images stored in `/client/public/images/` with descriptive names
- **Easy Replacement**: Clients can replace images by uploading files with same names
- **Responsive Helper Functions**: Automatic image optimization and fallbacks

### API Endpoints
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/:id` - Get specific destination details
- `GET /api/trips` - List active group trips
- `GET /api/trips/:id` - Get specific trip details
- `GET /api/blog-posts` - List published blog posts
- `POST /api/bookings` - Create trip booking
- `POST /api/consultations` - Submit consultation request
- `POST /api/contacts` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

### Frontend Pages
- **Home**: Hero section with stats and featured content
- **About**: Personal story and achievements
- **Destinations**: Browse offbeat travel destinations
- **Trips**: View and book group trips
- **Blog**: Travel articles and guides
- **Contact**: Contact forms and consultation booking

## Data Flow

1. **Content Management**: Static content is managed through the database with admin interfaces for creating destinations, trips, and blog posts
2. **Booking Flow**: Users browse trips → fill booking form → submit to API → confirmation
3. **Consultation Flow**: Users request consultation → form submission → email notification → follow-up
4. **Newsletter**: Users subscribe → email stored → periodic travel updates sent

## External Dependencies

### UI Components
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets

### Form Management
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration with React Hook Form

### Data Fetching
- **TanStack React Query**: Server state management and caching
- **Fetch API**: HTTP client for API requests

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: Neon database driver
- **PostgreSQL**: Primary database

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- tsx for running TypeScript server files
- Automatic database schema synchronization

### Production Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations are applied
4. **Assets**: Static files served from build directory

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Hosting Considerations
- Frontend: Static files can be served from any CDN
- Backend: Node.js server requires PostgreSQL connection
- Database: Neon serverless PostgreSQL for scalability
- Sessions: Stored in PostgreSQL for persistence across deployments

The application is designed for modern web hosting platforms with built-in PostgreSQL support and can be easily deployed to services like Vercel, Railway, or Replit.

## Client Management System (Latest Addition - August 22, 2025)

### Client Portal (`/client-portal`)
- **Single-link access** for complete website management
- **Visual dashboard** with three main sections: Overview, Images, Content
- **Quick action buttons** for immediate editing and CMS access
- **Step-by-step instructions** in non-technical language
- **Automatic edit mode activation** via URL parameters

### Image Management System
- **Centralized storage** in `/client/public/images/` folder
- **Simple replacement process** - same filename overwrites
- **Automatic optimization** and fallback handling
- **Client-friendly naming** (logo.png, profile-photo.jpg, etc.)

### Content Editing System  
- **Inline editing** - click directly on text to edit
- **Edit mode toggle** in navigation bar
- **Automatic saving** of all changes
- **Full CMS integration** for advanced management

### Default Content Structure
- **Home Page**: Hero section (7 items), Stats (6 items), Digital Products (3 items)
- **About Page**: Story section (3 items), Achievements (4 items)  
- **Contact Page**: Contact Info (3 items), Services (4 items)
- **Auto-selection** of Home Page → Hero section on CMS load