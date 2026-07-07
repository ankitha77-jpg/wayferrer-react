import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, MapPin, Users, Download, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DigitalProducts() {
  const [showAll, setShowAll] = useState(false);

  const guides = [
    {
      title: "Iceland Complete Guide",
      description: "Complete guide to the Land of Fire and Ice with hidden gems, Northern Lights tips, and budget strategies",
      price: "$15.99",
      pages: "60+ pages",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Iceland Northern Lights landscape"
    },
    {
      title: "Madagascar Guide",
      description: "Explore the world's 4th largest island with unique lemurs, baobabs, and UNESCO World Heritage sites",
      price: "$12.99",
      pages: "55+ pages",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Madagascar baobab trees landscape"
    },
    {
      title: "Bhutan Guide",
      description: "Navigate the Last Shangri-La with visa tips, monastery visits, and sustainable tourism practices",
      price: "$14.99",
      pages: "50+ pages",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Bhutan monastery in mountains"
    },
    {
      title: "Iraq Travel Guide",
      description: "Discover ancient Mesopotamia, Kurdish mountains, and modern Iraqi culture with safety considerations",
      price: "$13.99",
      pages: "45+ pages",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Iraq ancient architecture"
    },
    {
      title: "Peru Complete Guide",
      description: "Beyond Machu Picchu: Amazon rainforest, Inca trails, and authentic Peruvian experiences",
      price: "$11.99",
      pages: "48+ pages",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d8d0df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Peru Machu Picchu landscape"
    },
    {
      title: "Kyrgyzstan Guide",
      description: "Central Asia's hidden gem with pristine mountain lakes, nomadic culture, and yurt stays",
      price: "$10.99",
      pages: "42+ pages",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Kyrgyzstan mountain lakes"
    },
    {
      title: "Faroe Islands Guide",
      description: "Explore the Nordic gem in the North Atlantic with dramatic landscapes and Nordic culture",
      price: "$11.99",
      pages: "45+ pages",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Faroe Islands scenic landscape"
    }
  ];

  const displayedGuides = showAll ? guides : guides.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">#digital products</span>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Digital Travel Guides 🌍
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive destination guides with insider tips, detailed itineraries, and practical advice for offbeat destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedGuides.map((guide, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 rounded-t-lg"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <MapPin className="w-6 h-6 mb-2" />
                  <h3 className="text-xl font-bold">{guide.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{guide.price}</span>
                  <span className="text-sm text-gray-500">{guide.pages}</span>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <a href="/contact">
                    Get Guide
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {guides.length > 3 && (
          <div className="text-center mb-12">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="bg-gradient-to-r from-primary to-secondary text-white border-none hover:from-primary/90 hover:to-secondary/90 px-8 py-3"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronDown className="w-5 h-5 ml-2 rotate-180 transition-transform" />
                </>
              ) : (
                <>
                  View More Guides ({guides.length - 3} more)
                  <ChevronDown className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Membership Community */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Join the Wayfarer Community</h3>
            <p className="text-gray-600 mb-6">
              Get exclusive access to travel tips, destination guides, group trip discounts, and connect with like-minded travelers
            </p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Monthly</div>
                <div className="text-sm text-gray-600">Live Q&As</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Exclusive</div>
                <div className="text-sm text-gray-600">Content</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Monthly</div>
                <div className="text-2xl font-bold">$5.99</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                <div className="text-sm text-primary">Annual (Save 20%)</div>
                <div className="text-2xl font-bold text-primary">$69</div>
              </div>
            </div>
            <Button size="lg" className="mt-6 bg-primary hover:bg-primary/90">
              <a href="/contact">Join Community</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}