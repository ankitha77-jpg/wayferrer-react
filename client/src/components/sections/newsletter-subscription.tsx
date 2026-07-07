import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Mail, MessageCircle, Globe, Plane, Award, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function NewsletterSubscription() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [subscribeWhatsapp, setSubscribeWhatsapp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !whatsappNumber) {
      toast({
        title: "Error",
        description: "Please provide at least an email address or WhatsApp number.",
        variant: "destructive",
      });
      return;
    }

    if (subscribeWhatsapp && !whatsappNumber) {
      toast({
        title: "Error", 
        description: "Please provide your WhatsApp number to subscribe to WhatsApp updates.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("/api/newsletter", "POST", {
        email: subscribeNewsletter ? email : "",
        whatsappNumber: subscribeWhatsapp ? whatsappNumber : "",
        subscribeNewsletter,
        subscribeWhatsapp
      });

      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to the community! You'll receive travel tips and exclusive content soon.",
      });

      // Reset form and close dialog
      setEmail("");
      setWhatsappNumber("");
      setSubscribeNewsletter(true);
      setSubscribeWhatsapp(false);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-gray-700 font-medium">Join 50K+ travelers exploring 100+ countries</span>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden overflow-y-auto">
        <DialogHeader className="text-center p-6 pb-0">
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Join 50K+ Travelers Exploring 100+ Countries
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Get exclusive travel tips, destination guides, and early access to group trips. 
            Choose how you'd like to stay connected!
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Subscription */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter"
                  checked={subscribeNewsletter}
                  onCheckedChange={(checked) => setSubscribeNewsletter(checked === true)}
                />
                <Label htmlFor="newsletter" className="flex items-center gap-2 text-base font-medium">
                  <Mail className="w-4 h-4 text-primary" />
                  Subscribe to Email Newsletter
                </Label>
              </div>
              
              {subscribeNewsletter && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-600">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={subscribeNewsletter}
                    className="max-w-md"
                  />
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Weekly travel tips and destination guides</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Early access to new group trips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Exclusive travel deals and offers</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Subscription */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="whatsapp"
                  checked={subscribeWhatsapp}
                  onCheckedChange={(checked) => setSubscribeWhatsapp(checked === true)}
                />
                <Label htmlFor="whatsapp" className="flex items-center gap-2 text-base font-medium">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Join WhatsApp Travel Community
                </Label>
              </div>
              
              {subscribeWhatsapp && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="whatsapp-number" className="text-sm text-gray-600">
                    WhatsApp Number (with country code)
                  </Label>
                  <Input
                    id="whatsapp-number"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required={subscribeWhatsapp}
                    className="max-w-md"
                  />
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Instant travel alerts and flash deals</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Live updates from ongoing trips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Direct access to travel community</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 py-4 text-sm text-gray-600 border-t">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>100+ countries covered</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Weekly updates</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Join the Community"}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Unsubscribe anytime. We respect your privacy and never spam.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}