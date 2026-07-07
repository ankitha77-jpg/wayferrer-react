import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, BookOpen, Users, Award, CheckCircle, Plane, Briefcase, Shield, MapPin, Sparkles, Calendar, MessageCircle } from "lucide-react";
import bookCoverImage from "@assets/image_1753867823536.png?url";

const testimonials = [
  {
    quote: "As someone who's always felt held back by my Indian passport, Ankitha's journey gave me the push I needed to finally book my first solo trip. This book is power.",
    author: "Priya R.",
    location: "Bangalore"
  },
  {
    quote: "Reading WHY NOT? felt like having a brave older sister whispering, 'You can do this too.' I'm planning my first trip to Africa because of this book.",
    author: "Neha S.",
    location: "Pune"
  },
  {
    quote: "I never imagined a book could make me rethink how I define safety, fear, and freedom. Thank you for showing us what's possible, Ankitha.",
    author: "Tanya",
    location: "London"
  }
];

const whoIsThisFor = [
  {
    icon: Briefcase,
    text: "Ambitious professionals who won't sacrifice career for travel"
  },
  {
    icon: Shield,
    text: "Solo female travelers (especially women from the global south) breaking stereotypes"
  },
  {
    icon: Plane,
    text: "Passport strugglers who refuse to let visa rules dictate their dreams"
  },
  {
    icon: MapPin,
    text: "Adventure seekers bored of the same old destinations"
  },
  {
    icon: Sparkles,
    text: "Anyone who's ever thought, \"I can't because…\" – and is ready to flip that mindset!"
  }
];

const bookBenefits = [
  "Travel further on a weak passport - from finding the best support system on the ground, to visa hacks and smart budget planning",
  "Keep your job AND explore the world - maximizing long weekends, holidays, all while working meaningfully",
  "Break free from fear - solo travel as a woman, cultural barriers, and safety tips",
  "Go beyond the usual spots - hidden gems, underrated countries, and how to find them!",
  "Travel smarter (not richer) - tips that work for unconventional destinations"
];

export default function BookPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://static.wixstatic.com/media/e02a0b_28815b95c23b432bb3ab5b40790a4eb3~mv2.jpg/v1/fill/w_2190,h_920,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_28815b95c23b432bb3ab5b40790a4eb3~mv2.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">WHY NOT?</h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            A 9-5 job. 100+ unique countries across 7 continents.
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover how I did it with an Indian passport!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white text-lg px-8 py-6 rounded-full shadow-xl"
            asChild
          >
            <a 
              href="https://mybook.to/whynot" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="hero-buy-button"
            >
              GRAB YOUR COPY!
            </a>
          </Button>
        </div>
      </section>

      {/* Book Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="https://static.wixstatic.com/media/e02a0b_077e7da3f974423fb1d36487508ddd12~mv2.jpg/v1/fill/w_641,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_077e7da3f974423fb1d36487508ddd12~mv2.jpg"
                alt="Why Not? Book"
                className="rounded-2xl shadow-xl max-w-md w-full"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">WHY NOT?</h2>
              <p className="text-xl font-semibold text-primary">The Travel Book That Changes Everything</p>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Ever been told you can't travel the world because of your job, passport, or background? <strong>Think again.</strong>
                </p>
                <p>
                  "WHY NOT?" isn't just another travel book - it's a game-changing guide for those who refuse to accept limits. From Afghanistan to Madagascar, from South Sudan to Syria, this is written by an Indian with a "weak" passport who has traveled to 100+ countries (many offbeat and rarely visited) without quitting her job.
                </p>
                <p className="font-semibold text-gray-900">
                  This book shatters every excuse holding you back.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                asChild
              >
                <a 
                  href="https://mybook.to/whynot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="intro-buy-button"
                >
                  BUY THE BOOK
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Is This Book Different Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-coral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Is This Book Different <span className="text-primary">(And Why You Need It)!</span>
              </h2>
              
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-8 border-l-4 border-orange-500">
                <p className="text-lg text-gray-700 mb-4">
                  Most travel books preach:
                </p>
                <p className="text-xl font-semibold text-gray-900 italic mb-4">
                  "Quit your job, sell everything, and travel forever!"
                </p>
                <p className="text-lg text-gray-700">
                  BUT what if you don't want to - or can't?
                </p>
              </div>
              
              <p className="text-xl font-semibold text-primary mb-6">
                "WHY NOT?" gives you the blueprint to:
              </p>
              
              <div className="space-y-4">
                {bookBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <p className="mt-8 text-lg font-semibold text-gray-900">
                This isn't inspiration without action - it's a playbook to make seemingly impossible travel possible.
              </p>
            </div>
            
            <div className="flex justify-center">
              <img
                src="https://static.wixstatic.com/media/e02a0b_6daa3932c66c454cac4b3dc6ea806d80~mv2.jpg/v1/fill/w_952,h_618,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e02a0b_6daa3932c66c454cac4b3dc6ea806d80~mv2.jpg"
                alt="Travel Adventure"
                className="rounded-2xl shadow-xl max-w-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This Book For */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            WHO IS THIS BOOK FOR
          </h2>
          
          <div className="space-y-6">
            {whoIsThisFor.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-orange-50 to-coral-50 p-5 rounded-xl text-left">
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full text-white flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-lg text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            WHAT READERS ARE SAYING
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-none backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/70 text-sm">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Your Copy NOW & Start Traveling Differently
          </h2>
          <p className="text-xl mb-4 opacity-90">
            Stop waiting for the "perfect" time. The world isn't reserved for the privileged few -
          </p>
          <p className="text-2xl font-bold mb-8">
            it's for those who dare to ask, "WHY NOT?"
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-xl"
            asChild
          >
            <a 
              href="https://mybook.to/whynot" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="final-buy-button"
            >
              GRAB YOUR COPY HERE
            </a>
          </Button>
          
          <p className="mt-8 text-lg opacity-90">
            P.S. This isn't just a book, it's a movement. Join thousands of readers who are rewriting the rules of travel.
          </p>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Let's Talk
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Ready to start your travel journey? Here's how I can help:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Book a 1:1 Strategy Call</h3>
                <p className="text-gray-600 mb-6">
                  Book a 30 minute 1:1 Travel Strategy Call with me so you can learn to travel the world without pressing pause on your career!
                </p>
                <Button className="w-full" asChild>
                  <a href="/consultation">Book Consultation</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-secondary/20 hover:border-secondary/50 transition-all hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Join My Group Trips!</h3>
                <p className="text-gray-600 mb-6">
                  Don't have time to plan your own adventure? Join one of our incredible immersive adventures around the globe!
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/destinations">View Group Trips</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
