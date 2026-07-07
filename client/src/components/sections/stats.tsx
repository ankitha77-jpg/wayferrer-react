import { Globe, Users, MapPin } from "lucide-react";
import { STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <section className="py-16 bg-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-white text-2xl" />
            </div>
            <h3 className="text-4xl font-bold text-neutral mb-2">{STATS.countries}</h3>
            <p className="text-gray-600 font-medium">Countries Explored</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white text-2xl" />
            </div>
            <h3 className="text-4xl font-bold text-neutral mb-2">{STATS.community}</h3>
            <p className="text-gray-600 font-medium">Travel Community</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-white text-2xl" />
            </div>
            <h3 className="text-4xl font-bold text-neutral mb-2">{STATS.continents}</h3>
            <p className="text-gray-600 font-medium">Continents Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
