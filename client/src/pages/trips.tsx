import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, MapPin, Clock, Star, DollarSign, Heart, Globe, Camera, MessageCircle, CheckCircle, Phone, Plane, Play, ChevronUp, ChevronDown, X } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import TripBookingForm from "@/components/booking/trip-booking-form";
import type { Trip } from "@shared/schema";

// Authentic trip data from Wayfarer Footprints
const upcomingTrips = [
  {
    id: "madagascar",
    title: "Madagascar",
    price: "$1540",
    image: "https://source.unsplash.com/featured/800x600/?madagascar,baobab,landscape",
    description: "Explore the unique wildlife and landscapes of the world's fourth-largest island",
    highlights: ["Unique wildlife", "Baobab trees", "Tsingy formations", "Local culture"],
    duration: "10 days",
    groupSize: "8-12 people",
    gallery: [
      "https://source.unsplash.com/featured/400x300/?madagascar,baobab",
      "https://source.unsplash.com/featured/400x300/?madagascar,wildlife",
      "https://source.unsplash.com/featured/400x300/?madagascar,lemur",
      "https://source.unsplash.com/featured/400x300/?tsingy,stone,forest"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Madagascar is a biodiversity hotspot like no other. This island nation, separated from mainland Africa 160 million years ago, has evolved in isolation to become home to an extraordinary array of endemic species. During our 10-day adventure, you'll witness the iconic Avenue of the Baobabs at sunset, explore the razor-sharp limestone formations of Tsingy de Bemaraha, and encounter lemurs in their natural habitat at Andasibe-Mantadia National Park.",
    itinerary: [
      { day: 1, title: "Arrival in Antananarivo", description: "Airport pickup, city tour, welcome dinner" },
      { day: 2, title: "Andasibe-Mantadia National Park", description: "Lemur spotting and rainforest exploration" },
      { day: 3, title: "Avenue of the Baobabs", description: "Iconic sunset photography session" },
      { day: 4, title: "Tsingy de Bemaraha", description: "Limestone formations and canopy bridges" },
      { day: 5, title: "Local Village Experience", description: "Cultural immersion with Malagasy families" }
    ],
    included: ["Accommodation", "All meals", "Transportation", "National park fees", "English-speaking guide"],
    notIncluded: ["International flights", "Travel insurance", "Personal expenses", "Tips"]
  },
  {
    id: "kenya",
    title: "Kenya Safari",
    price: "$1525",
    image: "https://source.unsplash.com/featured/800x600/?kenya,safari,africa",
    description: "Experience the ultimate African safari adventure in Kenya's famous national parks",
    highlights: ["Big Five safari", "Maasai culture", "Great Migration", "Bush camping"],
    duration: "8 days",
    groupSize: "6-10 people",
    gallery: [
      "https://source.unsplash.com/featured/400x300/?kenya,lion,safari",
      "https://source.unsplash.com/featured/400x300/?masai,mara,wildlife",
      "https://source.unsplash.com/featured/400x300/?elephant,africa",
      "https://source.unsplash.com/featured/400x300/?masai,people,culture"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Kenya's legendary safari destinations offer some of the world's most spectacular wildlife viewing opportunities. From the vast savannas of the Masai Mara to the elephant herds of Amboseli, this journey takes you through Kenya's most iconic landscapes. Experience the Great Migration firsthand, witness the Big Five in their natural habitat, and immerse yourself in Maasai culture during authentic village visits.",
    itinerary: [
      { day: 1, title: "Nairobi to Masai Mara", description: "Game drive en route to luxury tented camp" },
      { day: 2, title: "Full Day Masai Mara", description: "Dawn and dusk game drives, Great Migration viewing" },
      { day: 3, title: "Masai Village Visit", description: "Cultural exchange and traditional ceremonies" },
      { day: 4, title: "Amboseli National Park", description: "Elephant herds with Mt. Kilimanjaro backdrop" },
      { day: 5, title: "Bush Camping Experience", description: "Overnight under the African stars" }
    ],
    included: ["Safari vehicles", "Professional guide", "All park fees", "Camping equipment", "All meals"],
    notIncluded: ["Flights to/from Kenya", "Visa fees", "Travel insurance", "Alcoholic beverages"]
  },
  {
    id: "mongolia",
    title: "Mongolia",
    price: "$2025",
    image: "https://source.unsplash.com/featured/800x600/?mongolia,steppes,nomadic",
    description: "Journey through the vast steppes and experience nomadic culture in traditional ger camps",
    highlights: ["Nomadic culture", "Ger camp stays", "Horseback riding", "Gobi Desert"],
    duration: "12 days",
    groupSize: "8-10 people",
    gallery: [
      "https://source.unsplash.com/featured/400x300/?mongolia,yurt,nomad",
      "https://source.unsplash.com/featured/400x300/?gobi,desert,camel",
      "https://source.unsplash.com/featured/400x300/?mongolia,horse,steppes",
      "https://source.unsplash.com/featured/400x300/?mongolia,landscape,mountains"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Mongolia's vast wilderness and nomadic traditions offer an unparalleled adventure into one of the world's last frontiers. From the rolling steppes to the dramatic Gobi Desert, experience life as Mongolian nomads have for centuries. Stay in traditional ger camps, learn horseback riding from expert herders, and witness the incredible hospitality of nomadic families who open their homes to travelers.",
    itinerary: [
      { day: 1, title: "Ulaanbaatar Arrival", description: "City exploration and cultural orientation" },
      { day: 2, title: "Terelj National Park", description: "First ger camp experience and horseback riding" },
      { day: 3, title: "Nomadic Family Stay", description: "Live with herder family, learn daily routines" },
      { day: 4, title: "Gobi Desert Journey", description: "Camel trekking and desert camping" },
      { day: 5, title: "Flaming Cliffs", description: "Dinosaur fossil sites and sunset viewing" }
    ],
    included: ["Ger accommodations", "All meals", "Domestic flights", "Horse riding lessons", "Cultural activities"],
    notIncluded: ["International flights", "Mongolia visa", "Personal gear", "Optional activities"]
  },
  {
    id: "peru",
    title: "Peru",
    price: "$2750",
    image: "https://source.unsplash.com/featured/800x600/?peru,machupicchu,andes",
    description: "Discover ancient Incan ruins, colorful markets, and breathtaking Andean landscapes",
    highlights: ["Machu Picchu", "Sacred Valley", "Local markets", "Andean culture"],
    duration: "14 days",
    groupSize: "10-12 people",
    gallery: [
      "https://source.unsplash.com/featured/400x300/?machupicchu,ruins,peru",
      "https://source.unsplash.com/featured/400x300/?cusco,market,colorful",
      "https://source.unsplash.com/featured/400x300/?andes,mountains,landscape",
      "https://source.unsplash.com/featured/400x300/?peru,llama,alpaca"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Peru's incredible cultural and natural heritage spans from the ancient Incan capital of Cusco to the mystical citadel of Machu Picchu. This comprehensive journey explores the Sacred Valley's terraced landscapes, vibrant textile markets, and traditional Andean communities. Experience authentic Peruvian cuisine, participate in ancient ceremonies, and trek through some of South America's most spectacular mountain scenery.",
    itinerary: [
      { day: 1, title: "Lima Arrival", description: "Colonial city tour and culinary introduction" },
      { day: 2, title: "Cusco Acclimatization", description: "Altitude adjustment and Inca sites exploration" },
      { day: 3, title: "Sacred Valley", description: "Pisac market and Ollantaytambo fortress" },
      { day: 4, title: "Machu Picchu", description: "Sunrise visit to the Lost City of the Incas" },
      { day: 5, title: "Amazon Rainforest", description: "Biodiversity exploration in Manu National Park" }
    ],
    included: ["Hotels and lodges", "Train to Machu Picchu", "All entrance fees", "Expert guides", "Most meals"],
    notIncluded: ["International flights", "Some meals in Lima/Cusco", "Tips", "Travel insurance"]
  },
  {
    id: "kazakhstan",
    title: "Kazakhstan",
    price: "$1485",
    image: "https://source.unsplash.com/featured/800x600/?kazakhstan,mountains,landscape",
    description: "Explore Central Asia's hidden gem with stunning landscapes and rich nomadic heritage",
    highlights: ["Almaty city", "Kolsai Lakes", "Traditional cuisine", "Soviet history"],
    duration: "9 days",
    groupSize: "8-10 people",
    gallery: [
      "https://source.unsplash.com/featured/400x300/?almaty,kazakhstan,city",
      "https://source.unsplash.com/featured/400x300/?kolsai,lakes,mountains",
      "https://source.unsplash.com/featured/400x300/?kazakhstan,steppes,landscape",
      "https://source.unsplash.com/featured/400x300/?central,asia,architecture"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Kazakhstan, the world's largest landlocked country, offers an incredible blend of Soviet history, nomadic traditions, and pristine natural beauty. From the cosmopolitan city of Almaty to the stunning Kolsai Lakes, this journey reveals Central Asia's best-kept secrets. Experience the unique fusion of cultures, taste authentic Central Asian cuisine, and explore landscapes that range from dramatic mountains to endless steppes.",
    itinerary: [
      { day: 1, title: "Almaty Exploration", description: "City tour including Green Bazaar and Panfilov Park" },
      { day: 2, title: "Kolsai Lakes", description: "Alpine hiking and pristine mountain lake photography" },
      { day: 3, title: "Charyn Canyon", description: "Grand Canyon-like formations and geological wonders" },
      { day: 4, title: "Traditional Village", description: "Kazakh cultural immersion and horseback riding" },
      { day: 5, title: "Soviet Heritage", description: "Space museum and architectural monuments" }
    ],
    included: ["Hotels", "All transportation", "Cultural activities", "Mountain hiking guides", "Traditional meals"],
    notIncluded: ["International flights", "Kazakhstan visa", "Personal expenses", "Optional activities"]
  }
];

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  
  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ["/api/trips"],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading amazing adventures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section with Travel Banner */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Travel Banner */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Subtle travel collage background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-gray-800/80 to-slate-900/85 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Travel collage"
              className="w-full h-full object-cover"
            />
            
            {/* Floating travel elements with subtle opacity */}
            <div className="absolute top-20 left-10 w-32 h-32 opacity-15 z-20">
              <img
                src="https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Machu Picchu"
                className="w-full h-full object-cover rounded-2xl rotate-12 shadow-2xl"
              />
            </div>
            
            <div className="absolute top-40 right-16 w-28 h-28 opacity-20 z-20">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Madagascar"
                className="w-full h-full object-cover rounded-2xl -rotate-12 shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-32 left-20 w-36 h-24 opacity-15 z-20">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Mongolia"
                className="w-full h-full object-cover rounded-2xl rotate-6 shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-20 right-12 w-32 h-32 opacity-20 z-20">
              <img
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Kenya Safari"
                className="w-full h-full object-cover rounded-2xl -rotate-6 shadow-2xl"
              />
            </div>
            
            {/* Subtle animated particles */}
            <div className="absolute inset-0 z-5">
              <div className="animate-pulse absolute top-1/4 left-1/4 w-2 h-2 bg-slate-400 rounded-full opacity-30"></div>
              <div className="animate-pulse absolute top-1/3 right-1/3 w-3 h-3 bg-gray-400 rounded-full opacity-20" style={{animationDelay: '1s'}}></div>
              <div className="animate-pulse absolute bottom-1/4 left-1/3 w-2 h-2 bg-slate-300 rounded-full opacity-25" style={{animationDelay: '2s'}}></div>
              <div className="animate-pulse absolute bottom-1/3 right-1/4 w-2 h-2 bg-gray-300 rounded-full opacity-30" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-30 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
            {/* Floating badge */}
            <div className="mb-8 animate-bounce">
              <Badge className="bg-white/15 backdrop-blur-md border border-white/20 text-white px-8 py-3 text-lg font-semibold shadow-xl">
                <Plane className="w-5 h-5 mr-3" />
                Join the Adventure Community
              </Badge>
            </div>
            
            {/* Main heading with subtle effect */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block mb-4 text-white">Travel the World</span>
              <span className="bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300 bg-clip-text text-transparent">
                Differently
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 font-light text-white/90">– With Me!</span>
            </h1>
            
            {/* Enhanced description */}
            <div className="max-w-5xl mx-auto mb-12">
              <p className="text-xl md:text-3xl font-light leading-relaxed mb-6 text-white/95">
                Love exploring places that aren't on everyone's radar?
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-white/85 max-w-4xl mx-auto">
                You've come to the right corner of the web. I'm <strong className="text-slate-200">Ankitha</strong>, 
                and I help curate and lead intimate, meaningful group trips to offbeat destinations across the world.
              </p>
            </div>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setShowJoinForm(true)}
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Join WhatsApp Community
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 text-lg px-10 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/contact">
                  <MapPin className="w-6 h-6 mr-3" />
                  Book Private Trip Planning
                </a>
              </Button>
            </div>
            
            {/* Enhanced benefit cards with subtle colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 mx-auto shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Small Groups"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl mb-4 text-white">Small Groups</h3>
                <p className="text-white/80 leading-relaxed">Intimate groups of 6-12 travelers for meaningful connections and personalized experiences</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 mx-auto shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Offbeat Destinations"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl mb-4 text-white">Offbeat Destinations</h3>
                <p className="text-white/80 leading-relaxed">Explore hidden gems and uncommon places that most travelers never discover</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 mx-auto shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Authentic Experiences"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl mb-4 text-white">Authentic Experiences</h3>
                <p className="text-white/80 leading-relaxed">Local families, home-cooked meals, and deep cultural immersion</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Group Trips */}
      <section className="py-32 bg-gradient-to-b from-gray-50 via-white to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced section header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <Badge className="bg-slate-100 text-slate-700 px-6 py-3 text-base font-semibold border border-slate-200">
                <Star className="w-5 h-5 mr-3 text-slate-700" />
                Adventure Awaits
              </Badge>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 bg-clip-text text-transparent">
                Upcoming Group Trips
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                At the heart of responsible travel is supporting local communities and preserving nature...
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                but something else I have always believed in is the importance of championing underrated destinations 
                and finding different ways of seeing the world!
              </p>
            </div>
          </div>

          {/* Enhanced trip grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {upcomingTrips.map((trip, index) => (
              <Card key={trip.id} className="group overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 relative">
                <div className="relative overflow-hidden">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // Fallback to gradient with country name if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback gradient display */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-slate-600 via-gray-500 to-slate-700 items-center justify-center">
                      <div className="text-center text-white p-8">
                        <Globe className="w-16 h-16 mx-auto mb-4 text-white/80" />
                        <h4 className="text-2xl font-bold text-white mb-2">{trip.title}</h4>
                        <p className="text-white/80 text-sm font-medium">Discover the adventure</p>
                      </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Enhanced price badge */}
                  <div className="absolute top-6 right-6 bg-slate-700 text-white px-5 py-3 rounded-2xl font-bold text-xl shadow-xl backdrop-blur-sm border border-slate-600">
                    {trip.price}
                  </div>
                  
                  {/* Enhanced featured badge */}
                  {index === 0 && (
                    <div className="absolute top-6 left-6 bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-semibold shadow-xl border border-slate-200">
                      <Star className="w-4 h-4 mr-2 text-orange-600 inline" />
                      Most Popular
                    </div>
                  )}
                  
                  {/* Floating action preview */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button 
                      className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/30 rounded-2xl px-8 py-4 font-semibold transform scale-95 group-hover:scale-100 transition-all duration-300"
                      onClick={() => setSelectedTrip(trip)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {trip.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{trip.description}</p>
                  </div>
                  
                  {/* Enhanced trip details */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Duration</p>
                        <p className="font-bold text-gray-900">{trip.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Group Size</p>
                        <p className="font-bold text-gray-900">{trip.groupSize}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced highlights */}
                  <div className="mb-8">
                    <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-orange-600" />
                      Trip Highlights:
                    </h4>
                    <div className="space-y-3">
                      {trip.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced action buttons */}
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      Get Trip Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-orange-300 text-orange-700 hover:bg-orange-50 py-4 rounded-2xl text-lg font-semibold hover:border-orange-400 transition-all duration-300"
                      onClick={() => window.open('https://wa.me/971501852340?text=Hello I am interested in the ' + trip.title + ' trip, please contact me', '_blank')}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-200/20 to-transparent rounded-full translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full -translate-x-40 translate-y-40"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-slate-100 text-slate-700 px-6 py-3 text-base font-semibold border border-slate-200 mb-8">
              <Heart className="w-5 h-5 mr-3 text-slate-700" />
              My Travel Philosophy
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 bg-clip-text text-transparent">
                Why Choose My Trips?
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Main content */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
                <div className="w-20 h-20 bg-orange-100 rounded-3xl mb-8 shadow-lg flex items-center justify-center">
                  <Globe className="w-10 h-10 text-orange-600" />
                </div>
                
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 font-medium">
                  My underrated group adventures might see you exploring lost UNESCO sites, sitting down for a 
                  home-cooked meal with a local family or watching wildlife after a hike.
                </p>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  The one thing they always have in common is that they're <strong className="bg-gradient-to-r from-slate-700 to-gray-600 bg-clip-text text-transparent text-2xl">uncommon</strong>.
                </p>
              </div>
            </div>
            
            {/* Right side - Feature cards */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl shadow-lg flex items-center justify-center">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Responsible Travel</h3>
                    <p className="text-gray-600 font-medium">Supporting communities & nature</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Every trip is designed to support local communities and preserve the natural environments we explore.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl shadow-lg flex items-center justify-center">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Unique Experiences</h3>
                    <p className="text-gray-600 font-medium">Lost UNESCO sites & hidden gems</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Discover places and experiences that don't exist on typical tourist itineraries.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl shadow-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Local Connections</h3>
                    <p className="text-gray-600 font-medium">Authentic cultural immersion</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Share meals and stories with local families, creating genuine connections that last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Community CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-gray-600 to-slate-800"></div>
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Travel icons floating */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-12 h-12 animate-bounce text-white">
            <Globe className="w-full h-full" />
          </div>
          <div className="absolute top-40 right-32 w-10 h-10 animate-bounce text-white" style={{animationDelay: '1s'}}>
            <MapPin className="w-full h-full" />
          </div>
          <div className="absolute bottom-32 left-32 w-12 h-12 animate-bounce text-white" style={{animationDelay: '2s'}}>
            <Camera className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 right-20 w-10 h-10 animate-bounce text-white" style={{animationDelay: '3s'}}>
            <Plane className="w-full h-full" />
          </div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
          <div className="mb-12">
            <div className="inline-block mb-8 animate-bounce">
              <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-full mx-auto shadow-xl border-4 border-white/20 flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Join My Private<br/>
              <span className="bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300 bg-clip-text text-transparent">
                WhatsApp Community
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-6 text-white/90 max-w-4xl mx-auto">
              Get first dibs on my group trips, exclusive travel tips, and connect with fellow adventurous travelers.
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Be the first to know about new offbeat destinations!
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-12 py-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowJoinForm(true)}
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Join WhatsApp Community
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-orange-300 text-orange-300 hover:bg-orange-500 hover:text-white font-semibold text-xl px-12 py-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://wa.me/971501852340?text=Hello I am interested in joining the community, please add me', '_blank')}
            >
              <Phone className="w-6 h-6 mr-3" />
              Chat Now
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto">
            <p className="text-white/85 text-lg leading-relaxed">
              <MapPin className="w-5 h-5 mr-2 text-orange-300 inline" />
              <strong>Need help with a private trip?</strong><br/>
              Book a 15-minute consultation and let me handle all the organizing so you can kick back and enjoy your dream trip hassle-free!
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Trip Details Modal */}
      <Dialog open={selectedTrip !== null} onOpenChange={(open) => !open && setSelectedTrip(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
          {selectedTrip && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedTrip(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100">
                {/* Hero Section with Video */}
                <div className="relative h-[60vh] overflow-hidden">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Video Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="w-12 h-12 ml-1" />
                    </button>
                  </div>
                  
                  {/* Hero Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-5xl font-bold mb-4">{selectedTrip.title}</h1>
                    <p className="text-2xl mb-6 text-white/90">{selectedTrip.description}</p>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-orange-400" />
                        <span className="text-2xl font-bold">{selectedTrip.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-400" />
                        <span className="text-xl">{selectedTrip.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-400" />
                        <span className="text-xl">{selectedTrip.groupSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-12">
                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-green-800">Pricing</h3>
                          <p className="text-green-600">{selectedTrip.price} per person</p>
                        </div>
                      </div>
                      <p className="text-green-700">All-inclusive adventure package</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-blue-800">Duration</h3>
                          <p className="text-blue-600">{selectedTrip.duration}</p>
                        </div>
                      </div>
                      <p className="text-blue-700">Carefully planned itinerary</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-purple-800">Group Size</h3>
                          <p className="text-purple-600">{selectedTrip.groupSize}</p>
                        </div>
                      </div>
                      <p className="text-purple-700">Intimate group experience</p>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div className="bg-slate-50 rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-slate-800">About This Adventure</h2>
                    <p className="text-lg leading-relaxed text-slate-700">{selectedTrip.detailedDescription}</p>
                  </div>

                  {/* Photo Gallery */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 text-slate-800">Photo Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedTrip.gallery?.map((image: string, idx: number) => (
                        <div key={idx} className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                          <img
                            src={image}
                            alt={`${selectedTrip.title} ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 text-slate-800">Day-by-Day Itinerary</h2>
                    <div className="space-y-6">
                      {selectedTrip.itinerary?.map((day: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-orange-600">{day.day}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2 text-slate-800">{day.title}</h3>
                              <p className="text-slate-600 leading-relaxed">{day.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included / Not Included */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-green-50 rounded-3xl p-8 border border-green-200">
                      <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                        What's Included
                      </h3>
                      <div className="space-y-3">
                        {selectedTrip.included?.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-green-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
                      <h3 className="text-2xl font-bold mb-6 text-red-800 flex items-center">
                        <X className="w-6 h-6 mr-3 text-red-600" />
                        Not Included
                      </h3>
                      <div className="space-y-3">
                        {selectedTrip.notIncluded?.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <span className="text-red-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready for This Adventure?</h2>
                    <p className="text-xl mb-8 text-white/90">Join me on this incredible journey to {selectedTrip.title}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg"
                        className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-2xl"
                        onClick={() => window.open('https://wa.me/971501852340?text=Hello I am interested in the ' + selectedTrip.title + ' trip (' + selectedTrip.price + '), please send me more details', '_blank')}
                      >
                        <MessageCircle className="w-6 h-6 mr-3" />
                        Get Trip Details
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline" 
                        className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-bold rounded-2xl"
                        asChild
                      >
                        <a href="/contact">Book Consultation</a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Scroll to Top Button */}
                <div className="fixed bottom-8 right-8 z-40">
                  <button
                    onClick={() => {
                      const modal = document.querySelector('.overflow-y-auto');
                      if (modal) modal.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronUp className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Join Community Form Modal */}
      <Dialog open={showJoinForm} onOpenChange={setShowJoinForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Join Wayfarer Footprints Community</DialogTitle>
          </DialogHeader>
          <JoinCommunityForm onSuccess={() => setShowJoinForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Join Community Form Component
function JoinCommunityForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    currency: 'USD',
    interestedTrip: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message with form data
    const message = `Hello! I'd like to join the Wayfarer Footprints community.
    
Name: ${formData.firstName}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Currency: ${formData.currency}
Interested Trip: ${formData.interestedTrip || 'Any offbeat destination'}

Please add me to the WhatsApp community for first dibs on group trips!`;

    const whatsappUrl = `https://wa.me/971501852340?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Country Code + Phone *</Label>
        <Input
          id="phone"
          type="tel"
          required
          placeholder="+971 50 123 4567"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="currency">Send me the cost for the group trip in: *</Label>
        <select
          id="currency"
          required
          value={formData.currency}
          onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="AED">AED</option>
          <option value="INR">INR (₹)</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
        </select>
      </div>

      <div>
        <Label htmlFor="interestedTrip">Which trip are you interested in?</Label>
        <select
          id="interestedTrip"
          value={formData.interestedTrip}
          onChange={(e) => setFormData(prev => ({ ...prev, interestedTrip: e.target.value }))}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select a trip</option>
          <option value="Madagascar">Madagascar ($1540)</option>
          <option value="Kenya Safari">Kenya Safari ($1525)</option>
          <option value="Mongolia">Mongolia ($2025)</option>
          <option value="Peru">Peru ($2750)</option>
          <option value="Kazakhstan">Kazakhstan ($1485)</option>
          <option value="Any offbeat destination">Any offbeat destination</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="newsletter" className="rounded" />
        <Label htmlFor="newsletter" className="text-sm">
          Yes, subscribe me to your newsletter & community updates!
        </Label>
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Join WhatsApp Community
      </Button>
    </form>
  );
}
