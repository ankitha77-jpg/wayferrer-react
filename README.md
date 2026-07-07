# Wayfarer Footprints - Travel Website

A comprehensive travel platform featuring Ankitha's expertise from visiting 109 countries, built with React, TypeScript, and a powerful CMS system.

## 🖼️ Image Management for Clients

### How to Replace Images

All website images are stored in the `/client/public/images/` folder. To update any image:

1. **Navigate to the images folder**: `client/public/images/`
2. **Find the image you want to replace** (see naming guide below)
3. **Prepare your new image**:
   - Save it with the **exact same filename** as the existing image
   - Recommended formats: JPG, PNG, WebP
   - Keep file sizes under 2MB for optimal performance
4. **Replace the file**: Upload your new image, overwriting the existing one
5. **Refresh your website** to see the changes

### Image Files and Their Purpose

| Filename | Purpose | Recommended Size |
|----------|---------|-----------------|
| `logo.png` | Website logo in navigation | 200x200 pixels |
| `profile-photo.jpg` | Your profile photo | 400x400 pixels |
| `book-cover.jpg` | Book cover image | 600x800 pixels |
| `world-map.png` | Interactive world map | 1200x800 pixels |

### Important Notes

- ⚠️ **Always keep the same filename** when replacing images
- 📱 Images are automatically optimized for mobile and desktop
- 🔄 Changes appear immediately after file replacement
- 💾 Keep backup copies of your original images
- 📏 Following the recommended sizes ensures best display quality

## 🛠️ For Developers

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack React Query

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up database**:
   ```bash
   npm run db:push
   ```

3. **Seed initial data**:
   ```bash
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Key Features

- 📝 **Inline Content Editing**: Click "Edit Mode" to edit content directly on pages
- 🏗️ **Comprehensive CMS**: Full admin panel at `/cms-admin`
- 🖼️ **Centralized Image Management**: All images referenced through `/client/src/lib/images.ts`
- 📱 **Responsive Design**: Optimized for all devices
- 🔍 **SEO Optimized**: Meta tags, structured data, and performance optimization

### Project Structure

```
├── client/                  # Frontend React application
│   ├── public/images/       # Client-manageable images
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── lib/images.ts   # Centralized image management
│   │   └── contexts/       # React contexts (EditMode, etc.)
├── server/                  # Backend Express application
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   └── seed-cms.ts         # Database seeding
├── shared/                  # Shared types and schemas
│   └── schema.ts           # Database schema + validation
```

### Deployment

The project is configured for deployment on Replit with:

- Automatic builds and restarts
- PostgreSQL database integration
- Environment variable management
- Production-ready optimizations

## 📄 License

© 2025 Wayfarer Footprints. All rights reserved.