import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Video, 
  MessageCircle, 
  CheckCircle, 
  Calendar, 
  Globe, 
  Users, 
  Plane, 
  Star,
  Compass,
  Heart,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "",
    destination: "",
    travelDates: "",
    budget: "",
    groupSize: "",
    experience: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const consultationTypes = [
    {
      value: "custom-trip",
      label: "Custom Trip Planning & On-Ground Local Support",
      description: "Planning a trip? Share your travel dates and number of travellers to receive tentative costs and itinerary guidance for 100+ destinations with my trusted local guides",
      icon: Plane,
      features: [
        "Travel itinerary based on your dates and pace",
        "Upfront tentative costs",
        "Local guide introductions once pricing is aligned",
        "Visa and entry assistance through guides, where possible"
      ],
      bookingLink: "mailto:ankitha77@gmail.com?subject=Custom Trip Planning Inquiry"
    }
  ];

  const whoIsThisFor = [
    {
      icon: Star,
      title: "Solo Travelers",
      description: "Especially women and first-time solo adventurers looking for confidence and practical tips"
    },
    {
      icon: Globe,
      title: "Weak Passport Holders",
      description: "Navigate visa challenges and discover destinations that welcome you with open arms"
    },
    {
      icon: Sparkles,
      title: "Working Professionals",
      description: "Learn to maximize weekends, holidays, and manage travel alongside your career"
    },
    {
      icon: Heart,
      title: "Adventure Seekers",
      description: "Inspiring travelers to explore the world far and wide!"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/consultations", formData);

      toast({
        title: "Consultation Request Submitted!",
        description: "I'll get back to you within 24 hours to schedule your consultation.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "",
        destination: "",
        travelDates: "",
        budget: "",
        groupSize: "",
        experience: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Heart className="w-4 h-4 mr-2" />
            Work With Me
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Let's Plan Your Next <GradientText>Adventure</GradientText>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Get personalized travel advice from someone who's been to 100+ countries with an Indian passport - 
            while working a full-time job. From trip planning to solo travel mentorship, I'm here to help 
            make your travel dreams reality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              <span>Video Call</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>30-60 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoIsThisFor.map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="hover:shadow-xl transition-all">
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary">
                  <Plane className="w-8 h-8" />
                </div>
              </div>
              <CardTitle className="text-2xl">Custom Trip Planning & On-Ground Local Support</CardTitle>
              <CardDescription className="text-base mt-2">
                Planning a trip? Share your travel dates and number of travellers to receive tentative costs and itinerary guidance for 100+ destinations with my trusted local guides
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Travel itinerary based on your dates and pace</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Upfront tentative costs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Local guide introductions once pricing is aligned</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Visa and entry assistance through guides, where possible</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                asChild
              >
                <a 
                  href="mailto:ankitha77@gmail.com?subject=Custom Trip Planning Inquiry" 
                  data-testid="book-custom-trip-button"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Group Trips CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            Don't Want to Plan? Join a Group Trip!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Don't have time to plan your own adventure? Join one of my incredible immersive group trips around the globe! 
            Everything is taken care of - just show up and enjoy.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <a href="/destinations">
              View Upcoming Group Trips
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Mentorship Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-coral-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Compass className="w-4 h-4 mr-2" />
            My Mission
          </Badge>
          <h2 className="text-3xl font-bold mb-6">
            Inspiring <GradientText>Travelers</GradientText> to Explore the World
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            My goal isn't just to help you plan a trip - it's to show you that the world is accessible 
            to everyone, regardless of your passport, background, or circumstances. I believe more 
            travelers deserve to see the world, and I'm here to help make that happen.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            asChild
          >
            <a 
              href="mailto:ankitha77@gmail.com?subject=Start My Travel Journey"
            >
              Start Your Journey Today
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
