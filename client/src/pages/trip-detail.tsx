import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Calendar, Clock, Users, MapPin, Star, Plane, ArrowLeft, Play, Image as ImageIcon, Heart, Share2 } from "lucide-react";
import TripBookingForm from "@/components/booking/trip-booking-form";
import { useState } from "react";
import type { Trip } from "@shared/schema";

export default function TripDetail() {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ["/api/trips"],
  });

  const trip = trips?.find(t => t.id === id);

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
          <p className="text-gray-600 mb-6">The trip you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/trips">View All Trips</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/trips">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Trips
            </a>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary text-white">
                  {trip.difficulty}
                </Badge>
                {trip.spotsAvailable <= 3 && (
                  <Badge variant="destructive">
                    Only {trip.spotsAvailable} spots left
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
                {trip.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {trip.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Departure</p>
                    <p className="text-gray-600">
                      {new Date(trip.startDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-gray-600">{trip.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="text-gray-600">{trip.groupSize}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-gray-600">
                      {trip.spotsAvailable}/{trip.totalSpots} spots
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <span className="text-4xl font-bold text-primary">${trip.price}</span>
                  <span className="text-gray-600 ml-2">per person</span>
                </div>
                
                <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl transition-all duration-300"
                      disabled={trip.spotsAvailable === 0}
                    >
                      {trip.spotsAvailable === 0 ? "Sold Out" : "Book This Trip"}
                      <Plane className="w-5 h-5 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Book Trip: {trip.title}</DialogTitle>
                    </DialogHeader>
                    <TripBookingForm
                      tripId={trip.id}
                      tripTitle={trip.title}
                      pricePerPerson={parseFloat(trip.price)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Details */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Trip Highlights</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-8">
                  {trip.description}
                </p>

                {/* Photo Gallery Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <ImageIcon className="w-6 h-6 text-primary" />
                      Photo Gallery
                    </h3>
                    <span className="text-sm text-gray-500">15 photos</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-2 row-span-2">
                      <div className="relative group cursor-pointer overflow-hidden rounded-lg h-64 md:h-80">
                        <img
                          src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                          alt="Madagascar landscape"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-semibold">Andasibe National Park</p>
                            <p className="text-sm opacity-90">Home to the Indri lemurs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg h-30 md:h-38">
                      <img
                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Madagascar wildlife"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-xs font-medium">Ring-tailed Lemurs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg h-30 md:h-38">
                      <img
                        src="https://images.unsplash.com/photo-1571842748019-bfebd6e1b25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Madagascar baobab trees"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-xs font-medium">Avenue of Baobabs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg h-30 md:h-38">
                      <img
                        src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Madagascar tsingy formations"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-xs font-medium">Tsingy de Bemaraha</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg h-30 md:h-38">
                      <img
                        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Madagascar coast"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="text-white text-center">
                          <p className="text-sm font-semibold">+10 more</p>
                          <p className="text-xs opacity-90">View all photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Reels Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Play className="w-6 h-6 text-primary" />
                      Video Highlights
                    </h3>
                    <span className="text-sm text-gray-500">6 videos</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-black">
                      <div className="aspect-[9/16] relative">
                        <img
                          src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Lemur encounter video"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-gray-800 ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="font-semibold text-sm mb-1">Lemur Encounter</p>
                          <p className="text-xs opacity-90">Getting up close with Madagascar's famous lemurs</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-black/50 px-2 py-1 rounded">2:34</span>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">1.2k</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-black">
                      <div className="aspect-[9/16] relative">
                        <img
                          src="https://images.unsplash.com/photo-1571842748019-bfebd6e1b25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Baobab sunset video"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-gray-800 ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="font-semibold text-sm mb-1">Baobab Sunset</p>
                          <p className="text-xs opacity-90">Magical golden hour at Avenue of Baobabs</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-black/50 px-2 py-1 rounded">1:45</span>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">856</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-black">
                      <div className="aspect-[9/16] relative">
                        <img
                          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="Tsingy exploration video"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-gray-800 ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="font-semibold text-sm mb-1">Tsingy Adventure</p>
                          <p className="text-xs opacity-90">Climbing the razor-sharp limestone formations</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-black/50 px-2 py-1 rounded">3:12</span>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">2.1k</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button variant="outline" className="group">
                      <Play className="w-4 h-4 mr-2 group-hover:text-primary" />
                      View All Videos
                    </Button>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Expert local guide and Ankitha's personal insights</li>
                  <li>• All accommodations (mix of boutique hotels and unique stays)</li>
                  <li>• All mentioned meals and authentic local dining experiences</li>
                  <li>• Transportation within the destination</li>
                  <li>• Entry fees to all listed attractions and activities</li>
                  <li>• Small group experience (maximum 12 travelers)</li>
                  <li>• Pre-trip planning session and detailed itinerary</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 mt-8">What's Not Included</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• International flights to/from destination</li>
                  <li>• Travel insurance (highly recommended)</li>
                  <li>• Personal expenses and souvenirs</li>
                  <li>• Optional activities not mentioned in itinerary</li>
                  <li>• Alcoholic beverages (unless specified)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Trip Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Destination</span>
                      <span className="font-semibold">{trip.title}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">{trip.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-semibold">{trip.groupSize}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Difficulty</span>
                      <span className="font-semibold">{trip.difficulty}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Available Spots</span>
                      <span className="font-semibold">
                        {trip.spotsAvailable}/{trip.totalSpots}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-gray-600">Price per person</span>
                      <span className="text-2xl font-bold text-primary">${trip.price}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white"
                    onClick={() => setShowBookingForm(true)}
                    disabled={trip.spotsAvailable === 0}
                  >
                    {trip.spotsAvailable === 0 ? "Sold Out" : "Book Now"}
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Questions? <a href="/contact" className="text-primary hover:underline">Contact us</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}