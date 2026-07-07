import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaPinterest } from "react-icons/fa";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://static.wixstatic.com/media/081a9a_964f0bbacaab490689b7af92f7c99fe2~mv2.png/v1/crop/x_0,y_0,w_415,h_506,q_85,enc_avif,quality_auto/081a9a_964f0bbacaab490689b7af92f7c99fe2~mv2.png"
              alt="Ankitha Rajendaran - Travel expert and author"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hi, I'm Ankitha!
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Author, Travel Curator, full time head of Marketing and part-time globetrotter with an insatiable love for off beat adventures. So far, I've explored <strong>100+ countries across all 7 continents</strong>, curating unforgettable experiences along the way!
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              What You'll Find Here.. are the ultimate guides to taking the road less traveled with a weaker passport and a busy job. You will discover in-depth travel guides, visa tips, and hidden gems that make exploring offbeat destinations a breeze. Let's turn the unconventional into your next unforgettable journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild>
                <a href="/about">My Story</a>
              </Button>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/ankitha.rajendaran" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ankitha-rajendaran-b4506958/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://in.pinterest.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaPinterest className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}