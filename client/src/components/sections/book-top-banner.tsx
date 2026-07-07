import { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

export function BookTopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 text-sm relative overflow-hidden z-50">
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative container mx-auto flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Book badge */}
          <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            📚 New Book
          </div>
          <span className="font-bold text-white text-sm md:text-base">
            "Why Not?" - Travel Adventures from 100+ Countries by Ankitha
          </span>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <a 
            href="https://mybook.to/whynot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-primary hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg border-2 border-white hover:border-gray-200"
          >
            Buy Book - $4.99
          </a>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}