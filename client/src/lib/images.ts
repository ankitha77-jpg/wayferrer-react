/**
 * Image Management System
 * 
 * This file centralizes all image references for easy management.
 * To update any image, simply replace the file in /public/images/ 
 * with the same filename.
 */

// Base path for all images
const IMAGE_BASE_PATH = '/images';

// Website Images - Organized by category
export const IMAGES = {
  // Brand & Logo
  logo: `${IMAGE_BASE_PATH}/logo-1.png`,
  
  // Hero & Background Images
  heroBackground: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  comeTravelBackground: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  
  // Profile & About
  profilePhoto: `${IMAGE_BASE_PATH}/profile-photo.jpg`,
  
  // Products
  bookCover: `${IMAGE_BASE_PATH}/book-cover.jpg`,
  worldMap: `${IMAGE_BASE_PATH}/world-map.png`,
  
  // Destinations & Travel
  destinations: {
    mountain: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    soloTravel: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    groupTravel: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  
  // Placeholder for missing images
  placeholder: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  
  // Add more categories as needed
} as const;

// Helper function to get image URL with fallback
export function getImageUrl(imagePath: string, fallback?: string): string {
  if (!imagePath) {
    return fallback || IMAGES.placeholder;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it doesn't start with /, add the base path
  if (!imagePath.startsWith('/')) {
    return `${IMAGE_BASE_PATH}/${imagePath}`;
  }
  
  return imagePath;
}

// Helper function for responsive images
export function getResponsiveImageUrl(imagePath: string, width?: number): string {
  const url = getImageUrl(imagePath);
  
  // For external URLs (Unsplash), add width parameter
  if (url.includes('unsplash.com') && width) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    return urlObj.toString();
  }
  
  return url;
}

// Export specific image categories for easy import
export const {
  logo,
  heroBackground,
  comeTravelBackground,
  profilePhoto,
  bookCover,
  worldMap,
  destinations,
  placeholder
} = IMAGES;