import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Calendar, Users, Plane, MessageCircle } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";

const contactFormSchema = insertContactSchema;
type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for Your Next <GradientText>Adventure?</GradientText>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about destinations, trip planning, or want to join a group adventure? Let's connect!
          </p>
        </div>
      </section>

      {/* Contact Options Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Whether you have questions about a destination, need travel advice, or want to collaborate, I'd love to hear from you.
                  </p>
                  
                  <div className="space-y-6">
                    <a href="mailto:ankitha77@gmail.com" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-gray-600">ankitha77@gmail.com</p>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Response Time</h4>
                        <p className="text-gray-600">Within 24-48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="What can I help you with?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Trip Planning Consultation">Trip Planning Consultation</SelectItem>
                                  <SelectItem value="Group Trip Inquiry">Group Trip Inquiry</SelectItem>
                                  <SelectItem value="Book Purchase">Book Purchase</SelectItem>
                                  <SelectItem value="Media & Press">Media & Press</SelectItem>
                                  <SelectItem value="Speaking Engagement">Speaking Engagement</SelectItem>
                                  <SelectItem value="Collaboration">Collaboration</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={5}
                                  placeholder="Tell me about your travel dreams, questions, or how I can help..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={contactMutation.isPending}
                          className="w-full py-3"
                        >
                          {contactMutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-20 bg-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Can I <GradientText>Help You?</GradientText>
            </h2>
            <p className="text-lg text-gray-600">
              Choose the option that best fits your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-3">Trip Planning</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Custom itineraries for offbeat destinations
                </p>
                <Button 
                  size="sm" 
                  asChild
                  className="w-full"
                >
                  <a href="/consultation">Book Consultation</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-bold mb-3">Group Trips</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join organized expeditions to amazing places
                </p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/destinations">View Trips</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold mb-3">Destination Guides</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Detailed guides for offbeat destinations
                </p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/blog">Browse Guides</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-neutral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="font-bold mb-3">Get the Book</h3>
                <p className="text-gray-600 text-sm mb-4">
                  "Why Not?" - My complete travel guide
                </p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Do you help people plan their trips and share local guide information?</h4>
                <p className="text-gray-600 text-sm">
                  Yes I do. To get a personalized quote from a local expert, please <a href="/consultation" className="text-primary hover:underline font-medium">get in touch</a> with your destination, travel dates, and number of guests.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">What's included in group trips?</h4>
                <p className="text-gray-600 text-sm">
                  Accommodation, most meals, local transportation, guided activities, permits, and my expertise throughout the journey. International flights are typically not included.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Which countries do you support private planning for?</h4>
                <p className="text-gray-600 text-sm">
                  Everywhere I've traveled. I always find the best expert local guides who provide full logistics and visa guidance. Popular destinations include: Iceland, Norway, Afghanistan, Iraq, Syria, Uganda, Kenya, Namibia, Zambia, Antarctica, Kyrgyzstan, Albania, Vietnam, Myanmar, Gabon, and Madagascar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">How far in advance should I book?</h4>
                <p className="text-gray-600 text-sm">
                  For group trips, I recommend booking 3-6 months in advance. For consultations and private trip planning, I can usually accommodate requests within 1-2 weeks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
