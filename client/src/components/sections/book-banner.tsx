import { useState } from 'react';
import { X, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bookCoverImage from '@assets/image_1753867823536.png?url';

export function BookBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">New Release!</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>"Why Not?" - Travel stories from 100+ countries</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm ml-1">(4.8/5)</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
            asChild
          >
            <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer">
              Get Book - $4.99
            </a>
          </Button>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-1"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}