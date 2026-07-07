import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { MapPin, Clock, Star, Globe, Filter, ChevronDown } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import type { Destination } from "@shared/schema";
import { useMemo, useState } from "react";
import chileTrip from "@assets/Screenshot_2026-01-26_at_1.15.40_PM_1769419161656.png?url";
import mongoliaTrip from "@assets/Screenshot_2026-01-26_at_1.16.48_PM_1769419170748.png?url";
import southKoreaTrip from "@assets/Screenshot_2026-01-26_at_1.15.58_PM_1769419179270.png?url";

export default function Destinations() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const selectedContinent = urlParams.get('continent');
  const [showAll, setShowAll] = useState(false);

  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  // Filter destinations by continent if specified
  const filteredDestinations = useMemo(() => {
    if (!destinations || !selectedContinent) return destinations;
    
    const continentMap: Record<string, string[]> = {
      'north-america': ['United States', 'Canada', 'Mexico', 'Guatemala', 'Costa Rica', 'Panama'],
      'south-america': ['Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile', 'Ecuador', 'Bolivia', 'Uruguay', 'Paraguay', 'Venezuela', 'Guyana', 'Suriname'],
      'europe': ['Germany', 'France', 'Italy', 'Spain', 'United Kingdom', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Poland', 'Czech Republic', 'Hungary', 'Portugal', 'Greece', 'Norway', 'Sweden', 'Denmark', 'Finland', 'Ireland', 'Croatia', 'Slovenia', 'Slovakia', 'Romania', 'Bulgaria', 'Serbia', 'Montenegro', 'Albania', 'North Macedonia', 'Bosnia and Herzegovina', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Cyprus'],
      'africa': ['Kenya', 'Tanzania', 'South Africa', 'Morocco', 'Egypt', 'Tunisia', 'Algeria', 'Libya', 'Sudan', 'Ethiopia', 'Ghana', 'Nigeria', 'Senegal', 'Mali', 'Burkina Faso', 'Niger', 'Chad', 'Central African Republic', 'Cameroon', 'Equatorial Guinea', 'Gabon', 'Republic of the Congo', 'Democratic Republic of the Congo', 'Angola', 'Zambia', 'Zimbabwe', 'Botswana', 'Namibia', 'Lesotho', 'Eswatini', 'Madagascar', 'Mauritius', 'Seychelles', 'Comoros', 'Djibouti', 'Eritrea', 'Somalia', 'Uganda', 'Rwanda', 'Burundi', 'Malawi', 'Mozambique', 'Ivory Coast', 'Liberia', 'Sierra Leone', 'Guinea', 'Guinea-Bissau', 'Gambia', 'Cape Verde', 'São Tomé and Príncipe'],
      'asia': ['India', 'China', 'Japan', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Singapore', 'Philippines', 'South Korea', 'Nepal', 'Bhutan', 'Sri Lanka', 'Myanmar', 'Cambodia', 'Laos', 'Bangladesh', 'Pakistan', 'Afghanistan', 'Iran', 'Iraq', 'Turkey', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Yemen', 'Jordan', 'Lebanon', 'Syria', 'Israel', 'Palestine', 'Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan', 'Mongolia', 'North Korea', 'Taiwan', 'Hong Kong', 'Macau', 'Brunei', 'East Timor', 'Maldives'],
      'australia': ['Australia', 'New Zealand', 'Papua New Guinea', 'Fiji', 'Solomon Islands', 'Vanuatu', 'Samoa', 'Tonga', 'Palau', 'Micronesia', 'Marshall Islands', 'Kiribati', 'Tuvalu', 'Nauru'],
      'antarctica': ['Antarctica']
    };

    const continentCountries = continentMap[selectedContinent] || [];
    return destinations.filter(dest => continentCountries.includes(dest.country));
  }, [destinations, selectedContinent]);

  const continentNames: Record<string, string> = {
    'north-america': 'North America',
    'south-america': 'South America',
    'europe': 'Europe',
    'africa': 'Africa',
    'asia': 'Asia',
    'australia': 'Australia & Oceania',
    'antarctica': 'Antarctica'
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {selectedContinent ? (
            <div className="mb-6">
              <a href="/destinations" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">← All Destinations</span>
              </a>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <GradientText>{continentNames[selectedContinent] || 'Unknown Region'}</GradientText>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Explore offbeat destinations and hidden gems across {continentNames[selectedContinent]} with insider tips.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <GradientText>Offbeat Destinations</GradientText>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover the world's most incredible hidden gems with insider tips and everything you need for your next adventure.
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Get Custom Itinerary</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Join Group Trip</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bucket-list adventures, <GradientText>handcrafted by experts.</GradientText>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Custom bucket-list trips to 100+ countries. Expert itineraries with the best stays and local cultural gems. Take the stress out of planning, let us handle everything for you.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:ankitha77@gmail.com?subject=I want help planning a private trip">
                Get in touch
              </a>
            </Button>
          </div>

          {filteredDestinations && filteredDestinations.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(showAll ? filteredDestinations : filteredDestinations.slice(0, 3)).map((destination) => (
                  <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={destination.imageUrl}
                        alt={`${destination.name}, ${destination.country}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge 
                          variant={destination.isOffbeat ? "default" : "secondary"}
                          className="bg-primary text-white"
                        >
                          {destination.isOffbeat ? "Offbeat" : "Popular"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {destination.continent}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-gray-600 mb-3">{destination.country}</p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{destination.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{destination.bestTimeToVisit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary" />
                          <span>{destination.difficulty}</span>
                        </div>
                      </div>

                      {destination.highlights && destination.highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="font-semibold text-sm mb-2">Highlights:</p>
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 3).map((highlight, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {destination.highlights.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{destination.highlights.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {destination.guidePrice && (
                          <span className="text-lg font-bold text-primary">
                            ${destination.guidePrice}
                          </span>
                        )}
                        <Button size="sm" asChild>
                          <a href="/contact">Learn More</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View More Button */}
              {filteredDestinations.length > 3 && (
                <div className="text-center mt-12">
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
                        View More Destinations ({filteredDestinations.length - 3} more)
                        <ChevronDown className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Iceland", image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&h=300&fit=crop" },
                { name: "Norway", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
                { name: "Finland", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop" },
                { name: "Kyrgyzstan", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&h=300&fit=crop" },
                { name: "Madagascar", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop" },
                { name: "Antarctica", image: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=400&h=300&fit=crop" },
                { name: "Namibia", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop" },
                { name: "Gabon", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop" },
                { name: "Zambia", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&h=300&fit=crop" },
                { name: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop" },
                { name: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop" },
                { name: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop" },
              ].map((destination) => (
                <div 
                  key={destination.name}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group"
                  data-testid={`destination-card-${destination.name.toLowerCase()}`}
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Group Trips */}
      <section className="py-12 bg-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <GradientText>Group Trips</GradientText>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join me and fellow travelers on curated adventures to offbeat destinations. Small groups, big experiences!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
              data-testid="trip-card-chile"
            >
              <img 
                src={chileTrip} 
                alt="Chile" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 70%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold underline decoration-2" style={{ color: '#FFD700' }}>Chile</h4>
                <p className="text-sm" style={{ color: '#FFD700' }}>June 1-7</p>
                <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>$1955</p>
              </div>
            </div>

            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
              data-testid="trip-card-mongolia"
            >
              <img 
                src={mongoliaTrip} 
                alt="Mongolia" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 75%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold underline decoration-2" style={{ color: '#FFD700' }}>Mongolia</h4>
                <p className="text-sm" style={{ color: '#FFD700' }}>June 6-13</p>
                <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>$1990</p>
              </div>
            </div>

            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
              data-testid="trip-card-south-korea"
            >
              <img 
                src={southKoreaTrip} 
                alt="South Korea" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 80%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold underline decoration-2" style={{ color: '#FFD700' }}>South Korea</h4>
                <p className="text-sm" style={{ color: '#FFD700' }}>October 17-24</p>
                <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>$2650</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <a href="mailto:ankitha77@gmail.com">Contact for More Information</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by Continent */}
      <section className="py-16 bg-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore by <GradientText>Continent</GradientText>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse travel guides, itineraries and tips organised by region — all written from personal experience.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: "/destinations/asia", label: "Asia", emoji: "🌏", bg: "from-amber-400 to-orange-500" },
              { href: "/destinations/africa", label: "Africa", emoji: "🌍", bg: "from-yellow-500 to-amber-600" },
              { href: "/destinations/europe", label: "Europe", emoji: "🏰", bg: "from-blue-400 to-indigo-500" },
              { href: "/destinations/north-america", label: "North America", emoji: "🌎", bg: "from-green-400 to-teal-500" },
              { href: "/destinations/south-america", label: "South America", emoji: "🌿", bg: "from-emerald-400 to-green-600" },
              { href: "/destinations/oceania", label: "Australia & Oceania", emoji: "🦘", bg: "from-cyan-400 to-sky-500" },
              { href: "/destinations/antarctica", label: "Antarctica", emoji: "🧊", bg: "from-slate-400 to-blue-600" },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${c.bg} p-6 text-white hover:scale-105 hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2 min-h-[110px] group`}
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-semibold text-sm sm:text-base text-center leading-tight">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Can't Find Your <GradientText>Dream Destination?</GradientText>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            I'm constantly adding new destinations. If there's a specific place you want to explore, let me know and I'll help you plan your perfect trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer">
                Get the Book
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
