import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Globe, Camera, Heart, Coffee, Compass, Star, Award, Plane, Mountain, BookOpen } from "lucide-react";
import ankithaImage from "@assets/image_1755502919909.png?url";

// Personal travel photos - using public folder paths
const travelPhotos = {
  collage: "/images/travel/wayfarer_footprints-2_1765357067358.png",
  travel1: "/images/travel/IMG_0749_(1)_1765359577809.JPG",
  travel2: "/images/travel/IMG_1411_(1)_1765359577810.JPG",
  travel3: "/images/travel/IMG_1584_1765359577810.jpeg",
  travel4: "/images/travel/IMG_1727_1765359577810.JPG",
  travel5: "/images/travel/IMG_1753_1765359577811.jpeg",
  travel6: "/images/travel/IMG_1797_(2)_1765359577811.JPG",
  travel7: "/images/travel/IMG_1993_(1)_1765359577811.JPG",
  travel8: "/images/travel/IMG_3155_1765359577812.jpeg",
  travel9: "/images/travel/IMG_3340_1765359577812.jpeg",
  travel10: "/images/travel/IMG_3624_1765359577812.JPG",
  travel11: "/images/travel/IMG_6083_jpg_1765359577813.jpg",
  travel12: "/images/travel/IMG_6293_1765359577813.JPG",
  travel13: "/images/travel/IMG_8441_1765359577813.JPG",
  travel14: "/images/travel/IMG_8756_1765359577813.jpeg",
};

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-coral-200/30 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-rose-200/30 to-orange-200/30 rounded-full translate-x-40 translate-y-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={ankithaImage}
                  alt="Ankitha Rajendaran on safari watching wildlife migration - Travel expert and author"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Floating stats card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">100+</div>
                      <div className="text-xs text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-600">7</div>
                      <div className="text-xs text-gray-600">Continents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rose-600">50K+</div>
                      <div className="text-xs text-gray-600">Community</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-coral-500 p-4 rounded-2xl text-white shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-gradient-to-r from-rose-500 to-orange-500 p-3 rounded-xl text-white shadow-lg">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium text-sm">
                Hello. This is me.
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-orange-500 via-coral-500 to-rose-500 bg-clip-text text-transparent">Ankitha!</span>
              </h1>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Director of Marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-coral-500 rounded-full"></div>
                    <span>Existentialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span>Nonconformist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-orange-500" />
                    <span>Filter Coffee girl</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Fridge magnet collector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-coral-500" />
                    <span>Leo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span>Opinionated sunshine child</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-coral-500 rounded-full"></div>
                    <span>Chronic under-packer</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white">
                  <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>Read My Book "Why Not?"</span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <a href="/consultation">Plan a Private Trip</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Disclosure Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-coral-50 rounded-3xl p-8 md:p-12 border border-orange-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-coral-500 p-3 rounded-2xl text-white group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-orange-500/25">
                  <div className="relative">
                    <Heart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors duration-300 cursor-pointer">
                    Full disclosure before you read any further.
                  </h2>
                </div>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p className="font-medium">
                  I am not a photographer, a full time travel blogger or a maker of incessant reels. I did not sell my belongings to be able to travel. Not everyone needs to quit their job or live a nomadic life to enjoy the experiences that traveling affords you.
                </p>
                
                <p>
                  I am the Director of Marketing for a few international restaurants in Dubai but I make it a point to travel as often as I can. That is my story. If you aspire to travel with a full time job, there are ways to do it - you just have to make it a priority.
                </p>
                
                <p>
                  This blog is a collection of my travels with my husband, Anand. So far we have been to <span className="font-bold text-orange-600">100+ countries across 7 continents</span> - from camping in the Himalayas to trekking in Machu Picchu to seeing the cherry blossoms half way around the world to seeing penguins at the edge of the world.. we have been lucky enough to do a bit of everything over the past few years.
                </p>
                
                <p>
                  There are more than a few amazing blogs on the internet already so I won't be reinventing the wheel. My goal is to inspire a handful of people to go on their own adventure - their first or their fiftieth. I will try to include an itinerary for what we did and where we stayed. If you are interested in a similar vacation, we got you covered.
                </p>
                
                <p className="font-medium text-orange-700">
                  Thank you for joining me on my journey to everywhere... Until later. Anki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Wayfarer Footprints Section */}
      <section className="py-20 bg-gradient-to-br from-coral-50 via-orange-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why <span className="bg-gradient-to-r from-orange-500 via-coral-500 to-rose-500 bg-clip-text text-transparent">wayfarer footprints?</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  I love walking. I am restless and constantly on the move. At home, at work. I can do it all day, every day.
                </p>
                
                <p>
                  Even when we travel, I love to walk as much as I can. Hence the wayfarer trying to leave a footprint in every corner of the world! :)
                </p>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 hover:bg-white/90 hover:border-orange-300 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-orange-500 to-coral-500 p-3 rounded-xl text-white group-hover:shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <div className="relative">
                        <Compass className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">My Travel Philosophy</h3>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Travel doesn't require you to abandon your career or lifestyle. It's about making smart choices, prioritizing experiences, and finding creative ways to explore the world while maintaining the life you've built.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Travel Gallery */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Journey Through</h3>
                  <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
                    <Camera className="w-5 h-5" />
                    <span className="text-lg font-semibold">100+ Countries • 7 Continents</span>
                  </div>
                </div>
                
                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Large feature image */}
                  <div className="col-span-2 md:col-span-2 md:row-span-2 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl h-64 md:h-full">
                      <img
                        src={travelPhotos.collage}
                        alt="Ankitha's travel adventures around the world"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-sm font-semibold">100+ Countries</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Smaller gallery images */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel1}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel2}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coral-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel3}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel4}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel5}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coral-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Second row of images */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel6}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel7}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coral-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel8}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel9}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Third row of images */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel10}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coral-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel11}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel12}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel13}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coral-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl h-32">
                      <img
                        src={travelPhotos.travel14}
                        alt="Travel adventure photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                
                {/* Gallery stats overlay */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gradient-to-r from-orange-50 to-coral-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-orange-600">100+</div>
                    <div className="text-xs text-gray-600">Countries</div>
                  </div>
                  <div className="bg-gradient-to-r from-coral-50 to-rose-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-coral-600">50K+</div>
                    <div className="text-xs text-gray-600">Community</div>
                  </div>
                  <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-rose-600">1000+</div>
                    <div className="text-xs text-gray-600">Adventures</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-orange-200 to-coral-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-rose-200 to-orange-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 lowercase">featured in</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 items-center justify-items-center max-w-5xl mx-auto">
            {/* The National */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 160 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <rect x="0" y="5" width="25" height="40" className="fill-blue-600"/>
                <text x="30" y="20" className="fill-blue-700 font-bold text-sm" fontFamily="serif">The</text>
                <text x="30" y="35" className="fill-blue-700 font-bold text-sm" fontFamily="serif">National</text>
              </svg>
            </div>

            {/* Gulf News */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 150 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="22" className="fill-gray-800 font-bold text-sm" fontFamily="sans-serif">GULF NEWS</text>
                <rect x="0" y="28" width="100" height="3" className="fill-gray-600"/>
                <text x="0" y="42" className="fill-gray-600 font-normal text-xs" fontFamily="sans-serif">UAE</text>
              </svg>
            </div>

            {/* Times of India */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 140 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="18" className="fill-gray-700 font-bold text-sm" fontFamily="serif">THE TIMES</text>
                <text x="0" y="32" className="fill-gray-700 font-bold text-sm" fontFamily="serif">OF INDIA</text>
              </svg>
            </div>

            {/* NDTV */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 100 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="30" className="fill-red-600 font-bold text-2xl" fontFamily="sans-serif">NDTV</text>
              </svg>
            </div>

            {/* Mint */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 100 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="30" className="fill-orange-500 font-bold text-2xl" fontFamily="sans-serif">mint</text>
              </svg>
            </div>

            {/* Outlook Traveller */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 120 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <rect x="0" y="0" width="115" height="50" className="fill-black"/>
                <text x="10" y="20" className="fill-white font-bold text-sm" fontFamily="sans-serif">OUTLOOK</text>
                <text x="10" y="35" className="fill-green-400 font-bold text-sm" fontFamily="sans-serif">TRAVELLER</text>
              </svg>
            </div>

            {/* Hindustan Times */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 180 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="25" className="fill-blue-800 font-bold text-sm" fontFamily="serif">Hindustan Times</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-coral-500 to-rose-500 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Travelers Say
            </h2>
            <p className="text-xl opacity-90">Real stories from fellow adventurers</p>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-sm border-none shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="mb-8">
                <h4 className="font-bold text-xl">Deepthi Nair</h4>
                <p className="text-white/80 text-lg">Dubai</p>
              </div>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-6">
                "Zambia never figured in my travel wishlist until I stumbled upon Ankitha's blog and social media posts. I was convinced pronto after reading about her experiences in this relatively untouched African country. Going off the beaten track, Ankitha's recommendations and pro tips are a traveler's delight. Even without knowing her personally, I knew this was one traveler whose wisdom and choices I could trust blindly. She is authentic and refreshingly honest about her recommendations, which is so rare in the world of influencer marketing today."
              </p>
              <div className="flex text-yellow-300 text-2xl">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-orange-500 via-coral-500 to-rose-500 bg-clip-text text-transparent">Offbeat Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's turn your travel dreams into reality. Whether you want to book a consultation, join a group trip, or just connect, I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white">
              <a href="/consultation">Plan a Private Trip</a>
            </Button>
            <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
              <a href="/destinations">Join Group Trips</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
