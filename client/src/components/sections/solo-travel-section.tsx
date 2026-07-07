import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Heart, Users } from "lucide-react";

export default function SoloTravelSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solo Travel Mastery 🚀
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights and inspiration for the independent adventurer, especially female solo travelers navigating the world with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-6">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety First</h3>
              <p className="text-gray-600 text-sm">
                Essential safety protocols and tips for solo female travelers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-6">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Destination Selection</h3>
              <p className="text-gray-600 text-sm">
                Choosing the right destinations for solo adventures
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-6">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Mental Wellness</h3>
              <p className="text-gray-600 text-sm">
                Building confidence and enjoying your own company
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-6">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Meeting People</h3>
              <p className="text-gray-600 text-sm">
                How to connect with locals and fellow travelers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <a href="/blog" className="flex items-center gap-2">
              Explore Solo Travel Guides
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