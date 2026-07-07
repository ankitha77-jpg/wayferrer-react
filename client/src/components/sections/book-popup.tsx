import { useState, useEffect } from 'react';
import { X, BookOpen, Star, StarHalf, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import bookCoverImage from '@assets/image_1753867823536.png?url';

export function BookPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [blogEmail, setBlogEmail] = useState('');
  const { toast } = useToast();

  const blogSubscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email, subscribeNewsletter: true });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're in!",
        description: "Check your inbox for the Top 5 Offbeat Destinations guide.",
      });
      setBlogEmail('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    localStorage.removeItem('bookPopupSeen');
    localStorage.removeItem('bookPopupLastSeen');

    const hasSeenPopup = localStorage.getItem('bookPopupSeen');
    const lastSeen = localStorage.getItem('bookPopupLastSeen');
    const oneDay = 24 * 60 * 60 * 1000;

    if (!hasSeenPopup || (lastSeen && Date.now() - parseInt(lastSeen) > oneDay)) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('bookPopupSeen', 'true');
    localStorage.setItem('bookPopupLastSeen', Date.now().toString());
  };

  const handleBlogSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogEmail) {
      blogSubscribeMutation.mutate(blogEmail);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm sm:max-w-lg md:max-w-2xl p-0 overflow-hidden mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto border-0">
        <VisuallyHidden>
          <DialogDescription>Why Not? Book & Blog Subscription</DialogDescription>
          <DialogDescription>
            Get Ankitha's travel book "Why Not?" and subscribe to the blog for offbeat travel guides.
          </DialogDescription>
        </VisuallyHidden>

        <DialogClose
          className="absolute right-4 top-4 z-10 rounded-full bg-black/30 backdrop-blur-sm p-1 opacity-80 hover:opacity-100 transition-opacity text-white"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex flex-col md:grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-primary to-secondary p-3 sm:p-4 md:p-8 flex items-center justify-center">
            <img
              src={bookCoverImage}
              alt="Why Not? Book by Ankitha Rajendaran"
              className="max-w-full h-auto max-h-32 sm:max-h-48 md:max-h-80 rounded-lg shadow-2xl"
            />
          </div>

          <div className="p-3 sm:p-4 md:p-6 bg-white flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                Bestseller on Kindle
              </span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 leading-tight">
              If I Can Do It, You Can Too.
            </p>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <StarHalf className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">4.5/5</span>
            </div>

            <p className="text-gray-600 mb-3 text-xs sm:text-sm leading-relaxed">
              100+ countries. 1 Indian passport. 0 resignations. Get the book that shatters every travel excuse.
            </p>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Trusted by 1000s of readers worldwide</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold mb-4"
              asChild
            >
              <a
                href="https://www.wayfarerfootprints.com/whynotbook"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
              >
                Grab Your Copy
              </a>
            </Button>

            <div className="border-t border-gray-200 pt-3">
              <p className="text-xs sm:text-sm text-gray-700 font-medium mb-2">
                Subscribe to the blog
              </p>
              <form onSubmit={handleBlogSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={blogEmail}
                  onChange={(e) => setBlogEmail(e.target.value)}
                  required
                  className="flex-1 text-sm h-9 border-gray-300"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={blogSubscribeMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-white text-xs px-3 h-9 whitespace-nowrap"
                >
                  {blogSubscribeMutation.isPending ? "..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
