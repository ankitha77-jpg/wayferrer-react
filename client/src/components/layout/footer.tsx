import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";
import logoImage from "@assets/image_1753875060626.png?url";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-neutral text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-md">
                <img 
                  src={logoImage} 
                  alt="Wayfarer Footprints Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">WAYFARER FOOTPRINTS</h3>
                <p className="text-xs text-gray-400">BY ANKITHA RAJENDARAN</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Exploring the unseen corners of the world, one offbeat destination at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                data-testid="social-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                data-testid="social-pinterest"
              >
                <FaPinterest className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Travel Guides
                </a>
              </li>
              <li>
                <a 
                  href="https://mybook.to/whynot" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Why Not? Book
                </a>
              </li>
              <li>
                <a href="/destinations" className="hover:text-white transition-colors">
                  Group Trips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/consultation" className="hover:text-white transition-colors">
                  Trip Planning
                </a>
              </li>
              <li>
                <a href="/destinations" className="hover:text-white transition-colors">
                  Group Adventures
                </a>
              </li>
              <li>
                <a href="/marketing-services" className="hover:text-white transition-colors">
                  Speaking Engagements
                </a>
              </li>
              <li>
                <a href="/marketing-services" className="hover:text-white transition-colors">
                  Media Partnerships
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get weekly offbeat travel tips and destination guides.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-gray-700 text-white border-gray-600 rounded-r-none focus:ring-primary"
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="rounded-l-none"
              >
                {newsletterMutation.isPending ? "..." : "→"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 WAYFARER ANKI. All rights reserved. Made with ❤️ for offbeat adventurers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
