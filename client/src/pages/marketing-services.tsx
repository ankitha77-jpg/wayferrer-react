import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Camera, 
  Hotel, 
  Instagram, 
  FileText, 
  Video, 
  Handshake,
  CheckCircle2,
  Globe,
  MapPin,
  Users,
  TrendingUp
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import jmyLogo from "@assets/jrnyon_logo_(1)_1770809740072.jpeg?url";

const stats = [
  { value: "100+", label: "Countries Visited" },
  { value: "7", label: "Continents Explored" },
  { value: "50K+", label: "Social Following" },
  { value: "1M+", label: "Annual Reach" },
];

const services = [
  {
    icon: Camera,
    title: "Destination Campaigns",
    description: "Full-scale destination marketing with authentic storytelling, stunning visuals, and engaging content that inspires travel."
  },
  {
    icon: Hotel,
    title: "Hotel & Resort Features",
    description: "Immersive property reviews, photo/video content, and social media coverage that showcases unique experiences."
  },
  {
    icon: Instagram,
    title: "Social Media Takeovers",
    description: "Instagram Stories, Reels, and live content creation that engages my 50K+ community of travel enthusiasts."
  },
  {
    icon: FileText,
    title: "Sponsored Blog Posts",
    description: "SEO-optimized long-form content with authentic narratives that drive traffic and bookings."
  },
  {
    icon: Video,
    title: "Video Content",
    description: "Professional travel videos, vlogs, and cinematic content that captures destinations beautifully."
  },
  {
    icon: Handshake,
    title: "Brand Ambassadorships",
    description: "Long-term partnerships with aligned brands for consistent, authentic representation."
  }
];

const trustedBrands = [
  { name: "Anantara" },
  { name: "JRNY", logo: jmyLogo },
  { name: "Mvuu Lodge" },
  { name: "Gondwana" },
  { name: "Templation" },
];

const whyPartner = [
  "Authentic storytelling that resonates with adventure-seeking audiences",
  "Expertise in offbeat, underrated destinations most influencers don't cover",
  "Professional photography and videography skills",
  "Strong engagement rates with a loyal, travel-focused community",
  "Experience with both luxury and budget travel content",
  "Cultural sensitivity and deep understanding of diverse destinations",
  "Track record of successful brand partnerships and measurable results",
];

export default function MarketingServices() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-coral-200/30 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-rose-200/30 to-orange-200/30 rounded-full translate-x-40 translate-y-40"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium text-sm mb-6">
            <Instagram className="w-4 h-4" />
            For Brands & Tourism Boards
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Let's Create <GradientText>Magic Together</GradientText>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Partner with a travel creator who has explored 100+ countries across 7 continents. I bring authentic storytelling, stunning visuals, and a community that trusts my recommendations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" asChild>
              <a href="mailto:ankitha77@gmail.com?subject=Rate Card Request">
                <Mail className="w-5 h-5 mr-2" />
                Request Rate Card
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://www.instagram.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 mr-2" />
                View My Work
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-orange-500 to-accent bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Content <GradientText>Services</GradientText>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From social media campaigns to in-depth destination features, I offer a range of content creation services tailored to your brand's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Leading Brands */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted By <GradientText>Leading Brands</GradientText>
            </h2>
            <p className="text-gray-600">
              I've had the privilege of working with tourism local guides
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {trustedBrands.map((brand, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl px-8 py-5 flex items-center justify-center hover:shadow-md transition-all duration-300 min-w-[150px] h-20">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-full object-contain" />
                ) : (
                  <span className="text-gray-700 font-semibold text-sm">{brand.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Me */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Partner <GradientText>With Me</GradientText>
            </h2>
          </div>

          <div className="space-y-5">
            {whyPartner.map((point, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-lg">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can create compelling content that showcases your destination, hotel, or travel brand to an engaged audience of adventure seekers.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <span className="text-xl font-semibold">Get in Touch</span>
            </div>
            <p className="mb-6 opacity-90">
              Email me for rate cards and partnership opportunities
            </p>
            <Button
              size="lg"
              className="w-full bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <a href="mailto:ankitha77@gmail.com?subject=Marketing Services Inquiry">
                ankitha77@gmail.com
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm opacity-75">
            Average response time: 24-48 hours
          </p>
        </div>
      </section>
    </div>
  );
}
