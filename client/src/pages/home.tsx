import { useState, useEffect, useRef, useCallback } from "react";
import Hero from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats-section";
import AboutPreview from "@/components/sections/about-preview";
import DigitalProducts from "@/components/sections/digital-products";
import VisitedCountriesMap from "@/components/sections/visited-countries-map";
import { NewsletterSubscription } from "@/components/sections/newsletter-subscription";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { InlineEdit } from "@/components/InlineEdit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Users, BookOpen, Star, Calendar, Plane, Globe, TrendingUp, Award, Camera, Instagram, ExternalLink, Heart, ArrowRight, Sparkles, Compass } from "lucide-react";
import { MEDIA_MENTIONS } from "@/lib/constants";
import { bookCover, destinations, comeTravelBackground } from "@/lib/images";
import type { BlogPost, Destination } from "@shared/schema";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const rotatingWords = ["Extraordinary", "Unforgettable", "Life-Changing", "Epic"];

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % rotatingWords.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={`inline-block transition-all duration-400 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {rotatingWords[index]}
    </span>
  );
}

function InteractiveCard({ children, delay, color }: { children: React.ReactNode; delay: number; color: string }) {
  const { ref, isInView } = useInView(0.15);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
        className="relative h-full"
        style={{
          transform: isHovered ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)` : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-3xl blur-xl transition-all duration-500 ${isHovered ? 'scale-110 opacity-80' : 'scale-100 opacity-40'}`}></div>
        {children}
      </div>
    </div>
  );
}

// Testimonials data - from wayfarerfootprints.com
const testimonials = [
  {
    id: 1,
    quote: "Zambia never figured in my travel wishlist until I stumbled upon Ankitha's blog and social media posts. I was convinced pronto after reading about her experiences in this relatively untouched African country. Going off the beaten track, Ankitha's recommendations and pro tips are a traveler's delight. Even without knowing her personally, I knew this was one traveler whose wisdom and choices I could trust blindly. She is authentic and refreshingly honest about her recommendations, which is so rare in the world of influencer marketing today. She is among a handful of content creators and travel bloggers who I respect immensely and whose words I trust. Her attention to detail and desire to portray an honest picture of the places she visits impresses you. I thoroughly enjoyed staying at the properties she suggested and followed her itinerary and guide recommendation. Suffice to say, my Zambia trip planning was a breeze and ended in a memorable holiday!",
    author: "Deepthi Nair",
    location: "Dubai",
    destination: "Zambia"
  },
  {
    id: 2,
    quote: "Anki's travel planning was nothing short of exquisite. Every detail of my trip to Bhutan was flawlessly curated, blending cultural richness with serene moments of reflection... but the highlight was her recommendation of an amazing local guide, he was a true gem. His knowledge, warmth, and intuitive understanding of my travel style elevated the entire experience. Thanks to Anki's thoughtful organization and eye for quality, I didn't just visit Bhutan - I truly felt it!",
    author: "Annasitchy Feet",
    location: "Bhutan Private Trip",
    destination: "Bhutan"
  },
  {
    id: 3,
    quote: "Ankitha's meticulous planning brings every trip to life, even through her Instagram stories. She avoids crowded tourist spots, instead focusing on hiking mountains, spotting wildlife, and immersing in local cultures of lesser-known destinations. For our trip to South Korea, Ankitha tailored the itinerary just for us and coordinated with a ground team in Seoul. Despite being halfway across the world and juggling work, Ankitha stepped in. Every day, she sent us a detailed itinerary with must-visit spots, photo tips, and even dining recommendations. Her effort ensured we had a seamless and unique experience, uncovering a side of South Korea far beyond the usual tourist trail!",
    author: "Vidya Kesavan",
    location: "South Korea Group Trip",
    destination: "South Korea"
  },
  {
    id: 4,
    quote: "I simply wanted to say how wonderfully informative your guides are and your passion for the road less travelled is gloriously clear. Well done!",
    author: "Shane",
    location: "Blog Reader",
    destination: "Travel Guides"
  },
  {
    id: 5,
    quote: "I went on a trip that was led by Ankitha to Bhutan in August 2024 along with 20 other people. The trip was curated by Ankitha extremely well and she considered all the experiences one could experience in the country in a week. She brought all her experience of traveling and exploring more than 100 countries that she has been to in curating an experience to explore Bhutan in the best way possible. Not only did she make sure that everyone had a great time but also made sure that she interacted with everyone. She connected with everyone on a personal level and encouraged them to experience everything planned and also was considerate enough to understand restrictions of some people and planned something else for them. She is aware that not everything can go as per plan and was quick on the feet to find a solution for it so that the trip continues smoothly. It doesn't matter if you are traveling solo/couple/group, she'll make it a point to make you feel included. She is open to recommendations and will discuss the same with you while travelling. I cannot recommend going on a trip with Ankitha enough as it will be one of the best decisions you make while traveling to a new place.",
    author: "Siddharth",
    location: "India",
    destination: "Bhutan"
  },
  {
    id: 6,
    quote: "Ankitha plans and executes such incredible itineraries - you can see her extensive travel experience shining through. The perfect mix of must-visit places and underrated gems ensures you get the best of every destination. I joined her group trip to Bhutan, Turkmenistan and it was such an incredible experience. I also got her recommendations in Taiwan for my solo trip, and they turned out to be some of my favorite places I have ever been to! And they were underrated spots, to the extent that some locals were surprised that a tourist even knew about them. I can't wait to do my next group trip.",
    author: "Alex Matthew",
    location: "Bhutan, Turkmenistan Group Trips, Taiwan Private Trip",
    destination: "Multiple Destinations"
  },
  {
    id: 7,
    quote: "Ankitha was the perfect planner for us! She created an itinerary that allowed us to discover Sri Lanka beautifully, tailoring it perfectly to what we wanted. It was one of the best trips of my life, thanks to the amazing tour guides she connected us with.",
    author: "Salma",
    location: "Sri Lanka Private Trip 2025",
    destination: "Sri Lanka"
  }
];

// Featured blog posts from Wix blog (actual content)
const featuredBlogPosts = [
  {
    id: 1,
    title: "Unforgettable Glamping Domes in Europe",
    excerpt: "5 epic spots for a unique outdoor stay - from the Swiss Alps to the Norwegian fjords, discover Europe's most magical glamping experiences.",
    imageUrl: "https://static.wixstatic.com/media/e02a0b_585c32f46dd344838f86a6f2223e3695~mv2.jpg/v1/fill/w_740,h_416,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_585c32f46dd344838f86a6f2223e3695~mv2.jpg",
    category: "Europe",
    readTime: 8,
    link: "https://www.wayfarerfootprints.com/post/glamping-domes-in-europe-5-epic-spots-for-a-unique-outdoor-stay"
  },
  {
    id: 2,
    title: "Morocco Itinerary 7 Days: Casablanca to Fez",
    excerpt: "Experience the magic of Moroccan cities - from vibrant medinas to the blue pearl of Chefchaouen. Your complete week-long adventure guide.",
    imageUrl: "https://static.wixstatic.com/media/e02a0b_8f6b716adb504bea84ed23b37626d66a~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_8f6b716adb504bea84ed23b37626d66a~mv2.jpg",
    category: "Africa",
    readTime: 10,
    link: "https://www.wayfarerfootprints.com/post/morocco-itinerary-7-days"
  },
  {
    id: 3,
    title: "7-Day Bhutan Itinerary: Best Places to Visit & Travel Tips",
    excerpt: "Discover the land of happiness - from Tiger's Nest Monastery to ancient dzongs. Your complete guide to exploring Bhutan's magical landscapes.",
    imageUrl: "https://static.wixstatic.com/media/e02a0b_ec8fe76e96b74f33aa074c102bba5537~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_ec8fe76e96b74f33aa074c102bba5537~mv2.jpg",
    category: "Asia",
    readTime: 10,
    link: "https://www.wayfarerfootprints.com/post/bhutan-itinerary-7day-travel-guide"
  }
];

export default function Home() {
  // Use the featured blog posts from the Wix blog directly
  const featuredPosts = featuredBlogPosts;

  // Load EmbedSocial Instagram widget script
  useEffect(() => {
    const scriptId = "EmbedSocialHashtagScript";
    if (document.getElementById(scriptId)) return;
    
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://embedsocial.com/cdn/ht.js";
    document.head.appendChild(script);
  }, []);

  return (
    <div className="pt-2">
      <Hero />
      <StatsSection />

      {/* Come Travel Section - Interactive */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${comeTravelBackground}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85"></div>
        
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary font-semibold text-sm mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
              <Sparkles className="w-4 h-4" />
              Start Your Journey
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-gray-800">Turn Your Vacation Days Into </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                <RotatingText />
              </span>
              <span className="text-gray-800"> Adventures</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              I've been to 100+ countries while maintaining my full-time marketing career. Let me show you how to maximize your vacation time and budget to experience the world's most incredible destinations.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter end={100} suffix="+" />
                </p>
                <p className="text-gray-500 text-sm mt-1">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter end={7} />
                </p>
                <p className="text-gray-500 text-sm mt-1">Continents</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter end={50} suffix="K+" />
                </p>
                <p className="text-gray-500 text-sm mt-1">Community</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter end={1} suffix="M+" />
                </p>
                <p className="text-gray-500 text-sm mt-1">Annual Reach</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InteractiveCard delay={0} color="from-primary/20 to-primary/5">
              <Card className="relative bg-white/80 backdrop-blur-sm border border-primary/20 shadow-xl rounded-3xl overflow-hidden h-full group cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="relative p-8 text-center flex flex-col h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50">
                      <img src={destinations.mountain} alt="Custom trip planning" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Compass className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors">1:1 Trip Planning</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                    Custom itineraries crafted from over 100 countries of experience
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all rounded-xl mt-auto group-hover:shadow-primary/25">
                    <a href="/consultation" className="flex items-center justify-center gap-2">
                      Start Planning
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </InteractiveCard>

            <InteractiveCard delay={150} color="from-secondary/20 to-secondary/5">
              <Card className="relative bg-white/80 backdrop-blur-sm border border-secondary/20 shadow-xl rounded-3xl overflow-hidden h-full group cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="relative p-8 text-center flex flex-col h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 overflow-hidden ring-2 ring-secondary/20 group-hover:ring-secondary/50">
                      <img src={destinations.airplane} alt="Offbeat destinations" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-secondary transition-colors">Offbeat Destinations</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                    Discover hidden gems where tourists don't go
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white shadow-lg hover:shadow-xl transition-all rounded-xl mt-auto group-hover:shadow-secondary/25">
                    <a href="/blog" className="flex items-center justify-center gap-2">
                      Explore Blogs
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </InteractiveCard>

            <InteractiveCard delay={300} color="from-accent/20 to-accent/5">
              <Card className="relative bg-white/80 backdrop-blur-sm border border-accent/20 shadow-xl rounded-3xl overflow-hidden h-full group cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="relative p-8 text-center flex flex-col h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 overflow-hidden ring-2 ring-accent/20 group-hover:ring-accent/50">
                      <img src={destinations.soloTravel} alt="Solo female traveler coaching" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-accent transition-colors">Solo Female Travel Mastery</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                    1-on-1 Solo Confidence Coaching to overcome mental blocks, establish safety protocols, and choose your first solo destination
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-secondary shadow-lg hover:shadow-xl transition-all rounded-xl mt-auto group-hover:shadow-accent/25">
                    <a href="/consultation" className="flex items-center justify-center gap-2">
                      Get Coaching
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </InteractiveCard>

            <InteractiveCard delay={450} color="from-purple-500/20 to-purple-300/10">
              <Card className="relative bg-white/80 backdrop-blur-sm border border-purple-200 shadow-xl rounded-3xl overflow-hidden h-full group cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="relative p-8 text-center flex flex-col h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 overflow-hidden ring-2 ring-purple-200 group-hover:ring-purple-400">
                      <img src={bookCover} alt="Why Not book cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">"WHY NOT"</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                    My bestselling book about favorite journeys as a solo traveler with a weak passport and a full-time job
                  </p>
                  <Button asChild variant="outline" className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white shadow-lg hover:shadow-xl transition-all rounded-xl mt-auto group-hover:shadow-purple-500/25">
                    <a href="/book" className="flex items-center justify-center gap-2">
                      Get the Book
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </InteractiveCard>
          </div>

          <div className="text-center mt-16">
            <NewsletterSubscription />
          </div>
        </div>
      </section>

      <AboutPreview />

      {/* Interactive World Map */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <p className="text-cyan-300 font-medium uppercase tracking-widest text-sm mb-3">My Global Adventure</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Where I've Been <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Around The World</span>
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              From the frozen peaks of Antarctica to the vibrant markets of Morocco — every pin on this map tells a story
            </p>
          </div>
          
          <VisitedCountriesMap />
          
          <div className="text-center mt-10">
            <p className="text-blue-200 mb-6">Dive into the blog for more stories and tips from these amazing destinations</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/blog">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25">
                  Explore Blog
                </Button>
              </a>
              <a href="/destinations">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25">
                  Join Me on a Group Trip
                </Button>
              </a>
              <a href="/consultation">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25">
                  Plan a Private Trip
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">As Seen In</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured In <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Top Media</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              My travel stories and adventures have been featured in leading publications across the globe
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 items-center justify-items-center max-w-5xl mx-auto">
            {/* Top Row - Authentic recreations */}
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

            {/* Khaleej Times */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 180 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="25" className="fill-gray-800 font-bold text-sm" fontFamily="serif">Khaleej Times</text>
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

            {/* Bottom Row */}
            {/* The ESTD */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 100 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <rect x="0" y="5" width="95" height="40" className="fill-red-600"/>
                <text x="12" y="22" className="fill-white font-bold text-sm" fontFamily="sans-serif">THE</text>
                <text x="12" y="35" className="fill-white font-bold text-sm" fontFamily="sans-serif">ESTD</text>
              </svg>
            </div>

            {/* MSN */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 120 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <circle cx="15" cy="25" r="6" className="fill-blue-500"/>
                <circle cx="25" cy="15" r="6" className="fill-green-500"/>
                <circle cx="35" cy="25" r="6" className="fill-yellow-500"/>
                <circle cx="45" cy="35" r="6" className="fill-red-500"/>
                <text x="60" y="30" className="fill-gray-700 font-bold text-lg" fontFamily="sans-serif">msn</text>
              </svg>
            </div>

            {/* 94.3 Tamil FM */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 120 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <circle cx="25" cy="25" r="20" className="fill-red-600"/>
                <text x="10" y="20" className="fill-white font-bold text-sm" fontFamily="sans-serif">94.3</text>
                <text x="5" y="32" className="fill-white font-bold text-xs" fontFamily="sans-serif">Tamil FM</text>
              </svg>
            </div>

            {/* Hindustan Times */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 180 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="25" className="fill-blue-800 font-bold text-sm" fontFamily="serif">Hindustan Times</text>
              </svg>
            </div>

            {/* MoneyControl */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 150 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <rect x="0" y="15" width="145" height="20" className="fill-green-600"/>
                <text x="10" y="28" className="fill-white font-bold text-sm" fontFamily="sans-serif">moneycontrol</text>
              </svg>
            </div>

            {/* Times Now */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 120 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <rect x="0" y="5" width="115" height="40" className="fill-red-700"/>
                <text x="12" y="22" className="fill-white font-bold text-sm" fontFamily="sans-serif">TIMES</text>
                <text x="12" y="35" className="fill-white font-bold text-sm" fontFamily="sans-serif">NOW</text>
              </svg>
            </div>

            {/* She The People */}
            <div className="flex items-center justify-center h-16 w-full">
              <svg viewBox="0 0 140 50" className="h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                <text x="0" y="20" className="fill-purple-600 font-bold text-sm" fontFamily="sans-serif">she the</text>
                <text x="0" y="35" className="fill-purple-600 font-bold text-sm" fontFamily="sans-serif">people</text>
              </svg>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative mb-16">
            <img
              src="https://static.wixstatic.com/media/081a9a_f984fc9955d542249aea500929988014~mv2.jpeg/v1/fill/w_1919,h_408,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/081a9a_f984fc9955d542249aea500929988014~mv2.jpeg"
              alt="Misty mountain landscape"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-16">Testimonials</h2>
          
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Book Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={bookCover}
                alt="Why Not? Book by Ankitha Rajendaran - Travel Odysseys of an Indian Passport"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-4">"Why Not?" - The Book</h2>
              <p className="mb-6 text-lg opacity-90">
                A collection of inspiring travel stories and practical advice for exploring 100+ countries while maintaining a full-time career.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold">₹499 / $4.99</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Bestseller</span>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer">
                  Buy The Book
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <DigitalProducts /> */}

      {/* Latest Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            <a href="/blog" className="hover:text-primary">Latest Blog Posts!</a>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
                data-testid={`blog-post-${post.id}`}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed - Live from @wayfarer_anki */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
              <Instagram className="w-10 h-10 text-pink-500" />
              Follow My Journey
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Stay updated with my latest adventures and travel discoveries on Instagram
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <a href="https://www.instagram.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                @wayfarer_anki
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          {/* EmbedSocial Instagram Widget */}
          <div 
            className="embedsocial-hashtag" 
            data-ref="e0ff7099d22ec0eb96a63dba9a5ecfaf17557afc"
            data-testid="instagram-feed-widget"
          />
        </div>
      </section>

    </div>
  );
}