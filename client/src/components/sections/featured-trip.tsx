import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Trip } from "@shared/schema";

export default function FeaturedTrip() {
  const { data: trips } = useQuery<Trip[]>({
    queryKey: ["/api/trips"],
  });

  const featuredTrip = trips?.[0]; // Get the first trip as featured

  if (!featuredTrip) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your <span className="gradient-text">Travel Tribe!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the hottest offbeat trips of the season with like-minded adventurers
          </p>
        </div>

        {/* Featured Trip */}
        <div className="bg-gradient-to-r from-neutral to-gray-800 rounded-3xl overflow-hidden shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 text-white">
              <div className="inline-block bg-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Next Trip
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{featuredTrip.title}</h3>
              <p className="text-lg mb-8 opacity-90">{featuredTrip.description}</p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-accent font-semibold">Duration</p>
                  <p>{featuredTrip.duration}</p>
                </div>
                <div>
                  <p className="text-accent font-semibold">Group Size</p>
                  <p>{featuredTrip.groupSize}</p>
                </div>
                <div>
                  <p className="text-accent font-semibold">Price</p>
                  <p>${featuredTrip.price} per person</p>
                </div>
                <div>
                  <p className="text-accent font-semibold">Difficulty</p>
                  <p>{featuredTrip.difficulty}</p>
                </div>
              </div>
              <Button asChild className="bg-accent text-neutral hover:bg-accent/90">
                <a href="/contact">Join This Trip</a>
              </Button>
            </div>
            <div className="relative h-96 lg:h-auto">
              <img
                src={featuredTrip.imageUrl}
                alt={featuredTrip.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
