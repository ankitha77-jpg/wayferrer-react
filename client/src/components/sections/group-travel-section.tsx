import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Calendar, Star } from "lucide-react";

export default function GroupTravelSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            FIND YOUR TRAVEL TRIBE!
          </h2>
          <h3 className="text-xl md:text-2xl mb-8 font-light">
            Join the Hottest Trips of the Season!
          </h3>
          <p className="text-lg max-w-3xl mx-auto mb-12 opacity-90">
            Experience offbeat destinations with like-minded travelers. Small groups, expertly curated itineraries, and unforgettable memories await.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/20">
              <img 
                src="https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="Small travel group"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Small Groups</h3>
            <p className="text-white/80 text-sm">
              Maximum 10-12 travelers for intimate experiences
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/20">
              <img 
                src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="Remote destination landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Offbeat Destinations</h3>
            <p className="text-white/80 text-sm">
              Madagascar, Socotra, Faroe Islands & more
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/20">
              <img 
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="Travel calendar planning"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Monthly Departures</h3>
            <p className="text-white/80 text-sm">
              Regular trips throughout the year
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/20">
              <img 
                src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="Travel guide expertise"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
            <p className="text-white/80 text-sm">
              Led by experienced travel curator Ankitha
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4">
            <a href="/trips" className="flex items-center gap-2">
              MONTHLY TRIPS!
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}