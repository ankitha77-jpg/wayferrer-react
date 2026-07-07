// import { useState, useMemo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// ;
// import { Search, Clock, Calendar, BookOpen, MapPin } from "lucide-react";
// import { GradientText } from "@/components/ui/gradient-text";
// import type { BlogPost } from "@shared/schema";

// interface ExternalPost {
//   id: string;
//   title: string;
//   description: string;
//   keywords: string[];
//   category: "Europe" | "Africa" | "Asia" | "Travel Tips";
//   url: string;
//   image: string;
// }

// const externalBlogPosts: ExternalPost[] = [
//   // Europe
//   { id: "e1", title: "Unforgettable Glamping Domes in Europe", description: "5 epic spots for a unique outdoor stay", keywords: ["glamping", "domes", "outdoor", "camping", "europe", "stay", "unique"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/glamping-domes-in-europe-5-epic-spots-for-a-unique-outdoor-stay", image: "https://static.wixstatic.com/media/e02a0b_585c32f46dd344838f86a6f2223e3695~mv2.jpg/v1/fill/w_740,h_416,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_585c32f46dd344838f86a6f2223e3695~mv2.jpg" },
//   { id: "e2", title: "5 Reasons Why Bosnia & Montenegro Should Be Your Next Adventure", description: "Hidden gems in the Balkans", keywords: ["bosnia", "montenegro", "balkans", "adventure", "europe", "hidden gems"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/5-reasons-why-bosnia-montenegro-should-be-your-next-european-adventure", image: "https://static.wixstatic.com/media/e02a0b_8c50891a8a5346c3968c0266ab89c21a~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_8c50891a8a5346c3968c0266ab89c21a~mv2.jpg" },
//   { id: "e3", title: "Serbia Travel Guide for the Intrepid Explorer", description: "Discover Serbia's best kept secrets", keywords: ["serbia", "travel", "guide", "explorer", "europe", "secrets", "belgrade"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/aguidetoserbia", image: "https://static.wixstatic.com/media/e02a0b_e6cf5253a945466c90e0aff732932f81~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_e6cf5253a945466c90e0aff732932f81~mv2.jpg" },
//   { id: "e4", title: "Albania Travel Guide | 8-Day Itinerary, Tips & Hidden Gems", description: "Complete Albania travel guide", keywords: ["albania", "travel", "guide", "itinerary", "tips", "hidden gems", "europe", "balkans"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/guidetoalbania", image: "https://static.wixstatic.com/media/e02a0b_971ab37df2cf42f4b888a74a2ec4b297~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_971ab37df2cf42f4b888a74a2ec4b297~mv2.jpg" },
//   { id: "e5", title: "Hermitage Museum Saint Petersburg: Complete Visitor Guide", description: "Everything you need to know", keywords: ["hermitage", "museum", "saint petersburg", "russia", "art", "visitor", "guide", "europe"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/hermitagemuseumsaintpetersburg", image: "https://static.wixstatic.com/media/e02a0b_27118f2f19f8498ab3afcbce3612ca8d~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_27118f2f19f8498ab3afcbce3612ca8d~mv2.jpg" },
//   { id: "e6", title: "A Guide to Spending 24 hours In Stockholm, Sweden", description: "Make the most of your day in Stockholm", keywords: ["stockholm", "sweden", "24 hours", "day trip", "guide", "europe", "scandinavia"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/a-guide-to-spending-24-hours-in-stockholm-sweden", image: "https://static.wixstatic.com/media/e02a0b_0366fdabd7a14060b490cc0ea6adc67f~mv2_d_1512_1512_s_2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_0366fdabd7a14060b490cc0ea6adc67f~mv2_d_1512_1512_s_2.jpg" },
//   { id: "e7", title: "Northern Lights Norway: Our Magical 10-Day Anniversary Adventure", description: "Chasing the Aurora Borealis", keywords: ["northern lights", "norway", "aurora borealis", "adventure", "anniversary", "winter", "europe", "scandinavia"], category: "Europe", url: "https://www.wayfarerfootprints.com/post/a-four-day-guide-to-spending-winter-in-northernlights", image: "https://static.wixstatic.com/media/e02a0b_fe6854c6ab934d3c92204dd05464bfff~mv2_d_2048_1368_s_2.jpeg/v1/fill/w_740,h_494,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_fe6854c6ab934d3c92204dd05464bfff~mv2_d_2048_1368_s_2.jpeg" },
//   // Africa
//   { id: "af1", title: "Mauritius Road Trip Itinerary: A 5-Day Nature-Filled Escape", description: "Cruise the coast and chase waterfalls", keywords: ["mauritius", "road trip", "itinerary", "nature", "waterfalls", "africa", "island", "beach"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/mauritius-road-trip-itinerary", image: "https://static.wixstatic.com/media/90e573_f7ce418beb664d719579101ba6e6b675~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/90e573_f7ce418beb664d719579101ba6e6b675~mv2.jpg" },
//   { id: "af2", title: "Morocco Itinerary 7 Days: Casablanca, Chefchaouen, Fez & Meknes", description: "Experience the magic of Moroccan cities", keywords: ["morocco", "itinerary", "casablanca", "chefchaouen", "fez", "meknes", "africa", "north africa"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/morocco-itinerary-7-days", image: "https://static.wixstatic.com/media/e02a0b_8f6b716adb504bea84ed23b37626d66a~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_8f6b716adb504bea84ed23b37626d66a~mv2.jpg" },
//   { id: "af3", title: "Ultimate Gabon Safari Guide: Loango National Park & Libreville", description: "Discover Gabon's wild beauty", keywords: ["gabon", "safari", "loango", "national park", "libreville", "africa", "wildlife"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/a-6-day-safari-adventure-in-gabon", image: "https://static.wixstatic.com/media/e02a0b_68db6e0ddf0b4dc8b084e72af05870a0~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_68db6e0ddf0b4dc8b084e72af05870a0~mv2.jpg" },
//   { id: "af4", title: "Discover Cameroon: Ekom-Nkam Waterfalls & Douala's Hidden Gems", description: "4-day itinerary for adventurers", keywords: ["cameroon", "waterfalls", "ekom-nkam", "douala", "africa", "adventure", "hidden gems"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/cameroontravelguide", image: "https://static.wixstatic.com/media/e02a0b_b50c48d3b2f84041aed65870f374cc0a~mv2.png/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_b50c48d3b2f84041aed65870f374cc0a~mv2.png" },
//   { id: "af5", title: "Lalibela Churches & Ethiopia Travel Guide: Solo, Safe & Spiritual", description: "Ethiopia's rock-hewn wonders", keywords: ["ethiopia", "lalibela", "churches", "solo travel", "spiritual", "africa", "rock churches"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/ethiopia-s-rock-hewn-wonders-exploring-the-lalibela-churches", image: "https://static.wixstatic.com/media/e02a0b_3af2b1ab570b4f55ac2b014defaf8c05~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_3af2b1ab570b4f55ac2b014defaf8c05~mv2.jpg" },
//   { id: "af6", title: "My Journey Through Djibouti's Danakil Depression & Lake Assal", description: "Exploring one of Earth's hottest places", keywords: ["djibouti", "danakil", "depression", "lake assal", "africa", "hot", "adventure"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/danakil-depression-djibouti", image: "https://static.wixstatic.com/media/e02a0b_5f1a3cf3542c4ccabf4ad6a8cfd37b5e~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_5f1a3cf3542c4ccabf4ad6a8cfd37b5e~mv2.jpg" },
//   { id: "af7", title: "South Sudan Travel: The Mundari Tribe Experience", description: "The youngest country in the world", keywords: ["south sudan", "mundari", "tribe", "africa", "culture", "youngest country"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/the-traditions-of-the-mundari-tribe-in-south-sudan", image: "https://static.wixstatic.com/media/e02a0b_5e7df84091744c26a36b13ed66189476~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_5e7df84091744c26a36b13ed66189476~mv2.jpg" },
//   { id: "af8", title: "Travel Guide to Discover the Wonders of Algeria", description: "North Africa's hidden treasure", keywords: ["algeria", "travel", "guide", "north africa", "hidden", "treasure", "sahara"], category: "Africa", url: "https://www.wayfarerfootprints.com/post/travel-guide-to-discover-the-wonders-of-algeria", image: "https://static.wixstatic.com/media/e02a0b_97e5a5a54b5841f9871475d307514537~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_97e5a5a54b5841f9871475d307514537~mv2.jpg" },
//   // Asia
//   { id: "as1", title: "7-Day Bhutan Itinerary: Best Places to Visit, Hikes & Travel Tips", description: "Discover the land of happiness", keywords: ["bhutan", "itinerary", "hikes", "travel tips", "asia", "happiness", "himalayas"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/bhutan-itinerary-7day-travel-guide", image: "https://static.wixstatic.com/media/e02a0b_ec8fe76e96b74f33aa074c102bba5537~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_ec8fe76e96b74f33aa074c102bba5537~mv2.jpg" },
//   { id: "as2", title: "6-Day Taiwan Itinerary: Cherry Blossoms, Temples & Night Markets", description: "Experience Taiwan's vibrant culture", keywords: ["taiwan", "itinerary", "cherry blossoms", "temples", "night markets", "asia", "culture"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/taiwan-itinerary", image: "https://static.wixstatic.com/media/e02a0b_b63663b668944b92ba8ef3b2fa1a4250~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_b63663b668944b92ba8ef3b2fa1a4250~mv2.jpg" },
//   { id: "as3", title: "Armenia Visa for Indians + 7 Day Itinerary & Travel Guide", description: "Complete Armenia planning guide", keywords: ["armenia", "visa", "indians", "itinerary", "travel guide", "asia", "caucasus"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/armenia-visa-for-indians-guide", image: "https://static.wixstatic.com/media/e02a0b_dc4d9f201ad648cd9430e8acd9ca7b64~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_dc4d9f201ad648cd9430e8acd9ca7b64~mv2.jpg" },
//   { id: "as4", title: "Laos and Philippines: 6 Days of Culture, Nature & Adventure", description: "Two countries, one epic journey", keywords: ["laos", "philippines", "culture", "nature", "adventure", "asia", "southeast asia"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/laosandphilippines", image: "https://static.wixstatic.com/media/e02a0b_da485cf5498b4c61a123401ff26d3a7b~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_da485cf5498b4c61a123401ff26d3a7b~mv2.jpg" },
//   { id: "as5", title: "Enchanting Myanmar: 7-Day Guide for Yangon, Bagan & Inle Lake", description: "Everything you need to know", keywords: ["myanmar", "yangon", "bagan", "inle lake", "guide", "asia", "temples"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/what-you-need-to-know-before-traveling-for-a-week-in-myanmar-a-complete-guide", image: "https://static.wixstatic.com/media/e02a0b_5c0f1d66542447789e5b9317be47b7c2~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_5c0f1d66542447789e5b9317be47b7c2~mv2.jpg" },
//   { id: "as6", title: "The Ultimate Solo Traveler's Guide to Exploring Syria Safely", description: "Off the beaten path adventure", keywords: ["syria", "solo travel", "safe", "adventure", "asia", "middle east", "offbeat"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/travel-to-syria", image: "https://static.wixstatic.com/media/e02a0b_64cd5163bc7a476fbe0d60c7a5eaddd8~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_64cd5163bc7a476fbe0d60c7a5eaddd8~mv2.jpg" },
//   { id: "as7", title: "A Laidback Weekend in Riyadh, Saudi Arabia: A Travel Guide", description: "Discover Saudi Arabia's capital", keywords: ["riyadh", "saudi arabia", "weekend", "travel guide", "asia", "middle east"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/things-to-do-in-riyadh", image: "https://static.wixstatic.com/media/e02a0b_b37f883616764caf806196f0bea35134~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_b37f883616764caf806196f0bea35134~mv2.jpg" },
//   { id: "as8", title: "Beyond the Headlines: Exploring Afghanistan's Untapped Beauty", description: "A perspective beyond the news", keywords: ["afghanistan", "beauty", "offbeat", "adventure", "asia", "central asia"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/travel-to-afghanistan", image: "https://static.wixstatic.com/media/e02a0b_e2a16d68542e4ba3b32453ef2cc2ebef~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_e2a16d68542e4ba3b32453ef2cc2ebef~mv2.jpg" },
//   { id: "as9", title: "Uzbekistan in 4 Days: Samarkand, Bukhara & Khiva with Mom", description: "Silk Road adventure", keywords: ["uzbekistan", "samarkand", "bukhara", "khiva", "silk road", "asia", "central asia"], category: "Asia", url: "https://www.wayfarerfootprints.com/post/your-ultimate-guide-to-traveling-in-uzbekistan", image: "https://static.wixstatic.com/media/e02a0b_6909084f52fa4445a925adaa2ab39285~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_6909084f52fa4445a925adaa2ab39285~mv2.jpg" },
//   // Travel Tips
//   { id: "tt1", title: "Top 10 Smart Travel Tips for Beginners", description: "Your first trip made easy", keywords: ["travel tips", "beginners", "first trip", "smart", "advice", "planning"], category: "Travel Tips", url: "https://www.wayfarerfootprints.com/post/travel-tips-for-beginners-your-guide-to-stress-free-adventures", image: "https://static.wixstatic.com/media/e02a0b_a97cfe3d32e849c3965814bafc063bcb~mv2.jpg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_a97cfe3d32e849c3965814bafc063bcb~mv2.jpg" },
// ];

// export default function Blog() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const search = params.get("search");
//     if (search) {
//       setSearchQuery(search);
//     }
//   }, []);

//   const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
//     queryKey: ["/api/blog-posts"],
//   });

//   const categories = ["All", "Europe", "Africa", "Asia", "Travel Tips"];

//   const scrollToSection = (category: string) => {
//     const sectionId = category.toLowerCase().replace(/\s+/g, '-');
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const handleCategoryClick = (category: string) => {
//     if (category === "All") {
//       setSelectedCategory(null);
//       setSearchQuery("");
//     } else {
//       setSelectedCategory(category);
//       scrollToSection(category);
//     }
//   };

//   const filteredExternalPosts = useMemo(() => {
//     if (!searchQuery.trim()) return externalBlogPosts;
    
//     const query = searchQuery.toLowerCase();
//     return externalBlogPosts.filter(post => 
//       post.title.toLowerCase().includes(query) ||
//       post.description.toLowerCase().includes(query) ||
//       post.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
//       post.category.toLowerCase().includes(query)
//     );
//   }, [searchQuery]);

//   const europePostsFiltered = filteredExternalPosts.filter(p => p.category === "Europe");
//   const africaPostsFiltered = filteredExternalPosts.filter(p => p.category === "Africa");
//   const asiaPostsFiltered = filteredExternalPosts.filter(p => p.category === "Asia");
//   const travelTipsPostsFiltered = filteredExternalPosts.filter(p => p.category === "Travel Tips");

//   const filteredPosts = blogPosts?.filter((post) => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !selectedCategory || selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   }) || [];

//   const featuredPost = filteredPosts[0];
//   const otherPosts = filteredPosts.slice(1);

//   const hasSearchResults = filteredExternalPosts.length > 0;

//   if (isLoading) {
//     return (
//       <div className="pt-16 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
//           <p className="text-lg text-gray-600">Loading travel stories...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             <GradientText>Travel Stories</GradientText> & Guides
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
//             Real adventures from offbeat destinations, practical travel tips, and everything you need to explore the world's hidden corners.
//           </p>
          
//           {/* Search and Filter */}
//           <div className="max-w-2xl mx-auto">
//             <div className="relative mb-6">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <Input
//                 type="text"
//                 placeholder="Search stories, destinations, tips..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-3 text-lg"
//               />
//             </div>
            
//             <div className="flex flex-wrap justify-center gap-2">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={selectedCategory === category ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleCategoryClick(category)}
//                   className="text-sm"
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Post */}
//       {featuredPost && (
//         <section className="py-20 bg-white">
//           <div className="max-w-6xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 <GradientText>Featured Story</GradientText>
//               </h2>
//               <p className="text-lg text-gray-600">Don't miss our latest adventure</p>
//             </div>

//             <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
//                   <img
//                     src={featuredPost.imageUrl}
//                     alt={featuredPost.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
                
//                 <div className="p-8 lg:p-12 flex flex-col justify-center">
//                   <div className="flex items-center gap-3 mb-4">
//                     <Badge className="bg-primary text-white">
//                       {featuredPost.category}
//                     </Badge>
//                     <div className="flex items-center gap-2 text-gray-500 text-sm">
//                       <Clock className="w-4 h-4" />
//                       {featuredPost.readTime}
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-500 text-sm">
//                       <Calendar className="w-4 h-4" />
//                       {new Date(featuredPost.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
//                   <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                  
//                   <Button size="lg" className="w-fit">
//                     Read Full Story
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </section>
//       )}

//       {/* External Blog Posts - Wix SEO Links with Images */}
//       <section className="py-10 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50">
//         <div className="max-w-6xl mx-auto px-4">
//           {/* Search Results Summary */}
//           {searchQuery && (
//             <div className="mb-8 text-center">
//               <p className="text-lg text-gray-700">
//                 Found <span className="font-bold text-primary">{filteredExternalPosts.length}</span> results for "{searchQuery}"
//               </p>
//               {filteredExternalPosts.length === 0 && (
//                 <p className="text-gray-500 mt-2">Try searching for a country name, continent, or travel topic</p>
//               )}
//             </div>
//           )}

//           {/* Europe Section */}
//           {europePostsFiltered.length > 0 && (
//             <div id="europe" className="mb-12 scroll-mt-24">
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <span className="text-3xl">🇪🇺</span> Europe
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {europePostsFiltered.map((post) => (
//                   <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block overflow-hidden group">
//                     <div className="aspect-[4/3] overflow-hidden">
//                       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
//                       <p className="text-sm text-gray-600">{post.description}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Africa Section */}
//           {africaPostsFiltered.length > 0 && (
//             <div id="africa" className="mb-12 scroll-mt-24">
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <span className="text-3xl">🌍</span> Africa
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {africaPostsFiltered.map((post) => (
//                   <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block overflow-hidden group">
//                     <div className="aspect-[4/3] overflow-hidden">
//                       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
//                       <p className="text-sm text-gray-600">{post.description}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Asia Section */}
//           {asiaPostsFiltered.length > 0 && (
//             <div id="asia" className="mb-12 scroll-mt-24">
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <span className="text-3xl">🌏</span> Asia
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {asiaPostsFiltered.map((post) => (
//                   <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block overflow-hidden group">
//                     <div className="aspect-[4/3] overflow-hidden">
//                       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
//                       <p className="text-sm text-gray-600">{post.description}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Travel Tips Section */}
//           {travelTipsPostsFiltered.length > 0 && (
//             <div id="travel-tips" className="mb-8 scroll-mt-24">
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <span className="text-3xl">💡</span> Travel Tips
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {travelTipsPostsFiltered.map((post) => (
//                   <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block overflow-hidden group">
//                     <div className="aspect-[4/3] overflow-hidden">
//                       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
//                       <p className="text-sm text-gray-600">{post.description}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* View All Button */}
//           <div className="text-center mt-12">
//             <a 
//               href="https://www.wayfarerfootprints.com/explore-destinations" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-coral-600 transition-all shadow-lg hover:shadow-xl"
//             >
//               View All Travel Guides on Wayfarer Footprints
//               <span className="text-xl">→</span>
//             </a>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { getBlogs } from "@/lib/blog-loader";
import { BlogCard } from "@/components/BlogCard";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync search from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  // FETCH LOCAL MARKDOWN BLOGS
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["local-blogs"],
    queryFn: getBlogs,
  });

  const categories = ["All", "Europe", "Africa", "Asia", "Travel Tips"];

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setSelectedCategory(null);
      setSearchQuery("");
    } else {
      setSelectedCategory(category);
    }
  };

  // FILTERING LOGIC
  const filteredPosts = useMemo(() => {
    if (!blogPosts) return [];
    
    return blogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        !selectedCategory || 
        selectedCategory === "All" || 
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts[0];

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading travel stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Travel Stories</GradientText> & Guides
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Real adventures from offbeat destinations, practical travel tips, and everything you need to explore the world's hidden corners.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search stories, destinations, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !searchQuery && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <GradientText>Featured Story</GradientText>
              </h2>
            </div>

            <a href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary text-white">{featuredPost.category}</Badge>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed line-clamp-3">{featuredPost.description}</p>
                    <Button size="lg" className="w-fit">Read Full Story</Button>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </section>
      )}

      {/* Blog Grid Section */}
      <section className="py-10 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-700">
                Found <span className="font-bold text-primary">{filteredPosts.length}</span> results for "{searchQuery}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No stories found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

