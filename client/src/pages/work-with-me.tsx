import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Camera, Plane, Heart, Star } from "lucide-react";

export default function WorkWithMePage() {
  const services = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Trip Planning & Consultation",
      description: "Get personalized travel itineraries and expert advice for your next adventure.",
      features: ["Custom itinerary design", "Budget planning", "Local recommendations", "24/7 support"],
      price: "Starting at $150"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Travel Organization",
      description: "Let me organize unforgettable group trips to offbeat destinations worldwide.",
      features: ["Complete trip management", "Group coordination", "Unique destinations", "Local experiences"],
      price: "Custom pricing"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Content Creation",
      description: "Travel photography, videography, and storytelling for brands and destinations.",
      features: ["Professional photography", "Travel videos", "Social media content", "Blog writing"],
      price: "Starting at $500"
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Travel Mentorship",
      description: "One-on-one mentorship for aspiring travel bloggers and content creators.",
      features: ["Personal guidance", "Strategy development", "Platform growth", "Monetization tips"],
      price: "Starting at $200"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      text: "Ankitha planned the most incredible trip to Southeast Asia for our group. Every detail was perfect!",
      rating: 5
    },
    {
      name: "Marco Silva",
      location: "São Paulo, Brazil",
      text: "The content creation services exceeded our expectations. Professional and creative work.",
      rating: 5
    },
    {
      name: "Emily Chen",
      location: "Toronto, Canada",
      text: "The travel mentorship helped me grow my blog from 0 to 50K followers in 6 months!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Work With Me
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Transform your travel dreams into reality with expert guidance from someone who's 
            explored 100+ countries and helped thousands of travelers create unforgettable experiences.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600">Trusted by 1000+ travelers worldwide</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-primary font-semibold">{service.price}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <a href="/contact">Get Started</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how we can work together to create your perfect travel experience.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/contact">Contact Me Today</a>
          </Button>
        </div>
      </section>
    </div>
  );
}