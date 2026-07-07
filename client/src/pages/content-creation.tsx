import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Instagram, 
  TrendingUp,
  Award,
  ShieldCheck,
  Briefcase,
  BarChart3,
  Target,
  Megaphone,
  Users,
  Lightbulb
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import ankithaImage from "@assets/WhatsApp_Image_2026-02-11_at_14.31.29_1770809624021.jpeg?url";
import wagamamaLogo from "@assets/wagamama_1770731106988.jpeg?url";
import alloBeirutLogo from "@assets/allo-beirut-l_1770731106987.png?url";
import cupbopLogo from "@assets/Cupbop_Logo638886987152372492_1770731106987.webp?url";
import freedomPizzaLogo from "@assets/freedom-pizza_1770731106988.webp?url";
import traderVicsLogo from "@assets/trader_vics_1770731106988.png?url";
import drvnCoffeeLogo from "@assets/DRVN_LOGO_1_1_1_c4cc96b2-7466-4a94-b60f-402dcc54e533_1770731106988.webp?url";
import datanuumLogo from "@assets/Screenshot_2026-02-10_at_17.44.40_1770731114413.png?url";
import jmyLogo from "@assets/jrnyon_logo_(1)_1770809740072.jpeg?url";

const highlights = [
  {
    icon: Briefcase,
    title: "Decade of Experience",
    description: "Over 10 years as Head of Marketing in the UAE"
  },
  {
    icon: BarChart3,
    title: "Multi-Million Dollar P&Ls",
    description: "Managed large-scale budgets and revenue targets"
  },
  {
    icon: ShieldCheck,
    title: "Ethical Brand Building",
    description: "Purpose-driven growth that builds lasting brand equity"
  }
];

const expertise = [
  {
    icon: TrendingUp,
    title: "Scaling Global Brands",
    description: "Expertise in scaling F&B, travel, lifestyle, hospitality, tech, and ecommerce brands across markets."
  },
  {
    icon: Target,
    title: "Data-Driven Growth",
    description: "A blend of project management, data-driven growth strategies, and purpose-led storytelling."
  },
  {
    icon: Megaphone,
    title: "Store Openings & Launches",
    description: "Orchestrated 14+ store openings for iconic names with full operational excellence."
  },
  {
    icon: Users,
    title: "Market Dominance",
    description: "Proven track record of operational excellence and market dominance through clarity, momentum and follow through."
  },
  {
    icon: Lightbulb,
    title: "Purpose-Led Storytelling",
    description: "Unique focus on ethical brand building, proven by past initiatives that build lasting brand equity."
  },
  {
    icon: Award,
    title: "Brand Partnerships",
    description: "Experience partnering with global restaurant chains, coffee brands, and tech companies."
  }
];

const brands = [
  { name: "wagamama", logo: wagamamaLogo },
  { name: "Allo Beirut", logo: alloBeirutLogo },
  { name: "Cup Bop", logo: cupbopLogo },
  { name: "Freedom Pizza", logo: freedomPizzaLogo },
  { name: "Trader Vic's", logo: traderVicsLogo },
  { name: "DRVN Coffee", logo: drvnCoffeeLogo },
  { name: "JRNY", logo: jmyLogo },
  { name: "Datanuum", logo: datanuumLogo },
];

export default function ContentCreation() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-coral-200/30 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-rose-200/30 to-orange-200/30 rounded-full translate-x-40 translate-y-40"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={ankithaImage}
                  alt="Ankitha Rajendaran - Marketing Leader, Strategist, Speaker & Author"
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-coral-500 p-4 rounded-2xl text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-gradient-to-r from-rose-500 to-orange-500 p-3 rounded-xl text-white shadow-lg">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium text-sm">
                Marketing Leader | Strategist | Speaker & Author
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Ankitha <span className="bg-gradient-to-r from-orange-500 via-coral-500 to-rose-500 bg-clip-text text-transparent">Rajendaran</span>
              </h1>
              
              <div className="grid grid-cols-3 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center shadow-md border border-orange-100">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-gray-800 text-sm font-semibold leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                With over a decade of experience as head of Marketing in the UAE, I specialize in scaling global F&B, travel, lifestyle, hospitality, tech, and ecommerce brands through a blend of project management, data-driven growth and purpose-led storytelling. Having managed multi-million dollar P&Ls and orchestrated 14+ store openings for iconic names like <strong>wagamama</strong>, <strong>Trader Vic's</strong>, and <strong>Allo Beirut</strong>, I bring a proven track record of operational excellence and market dominance through clarity, momentum and follow through. I have a unique focus on ethical brand building, proven by past initiatives that build brand equity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" asChild>
                  <a href="mailto:ankitha77@gmail.com?subject=Brand Partnership Inquiry">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/ankitha-rajendaran" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-8 bg-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <p className="text-white font-semibold text-lg">Connect & Explore Work</p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/ankitha-rajendaran" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a href="https://www.instagram.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a href="https://wayfarerfootprints.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Globe className="w-6 h-6 text-white" />
              </a>
              <a href="tel:+971000000000" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </a>
              <a href="mailto:ankitha77@gmail.com" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Partnered With */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Brands I Have <GradientText>Partnered With</GradientText>
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {brands.map((brand, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 w-full flex items-center justify-center hover:shadow-md hover:border-primary/30 transition-all duration-300 h-24">
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-800 font-bold text-lg text-center leading-tight">{brand.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-center font-semibold text-xl mt-10">
            <GradientText>Scaling Global Brands & Driving Growth</GradientText>
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Areas of <GradientText>Expertise</GradientText>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A strategic blend of brand building, operational excellence, and data-driven marketing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Scale Your Brand?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how I can bring clarity, momentum, and measurable growth to your brand through strategic marketing leadership.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <span className="text-xl font-semibold">Get in Touch</span>
            </div>
            <p className="mb-6 opacity-90">
              Email me for partnership and collaboration opportunities
            </p>
            <Button 
              size="lg" 
              className="w-full bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <a href="mailto:ankitha77@gmail.com?subject=Brand Partnership Inquiry">
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
