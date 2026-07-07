import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema } from "@shared/schema";

const tripBookingFormSchema = insertBookingSchema.extend({
  specialRequests: z.string().optional(),
});

type TripBookingFormData = z.infer<typeof tripBookingFormSchema>;

interface TripBookingFormProps {
  tripId: string;
  tripTitle: string;
  pricePerPerson: number;
}

export default function TripBookingForm({ tripId, tripTitle, pricePerPerson }: TripBookingFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TripBookingFormData>({
    resolver: zodResolver(tripBookingFormSchema),
    defaultValues: {
      tripId,
      name: "",
      email: "",
      phone: "",
      participants: 1,
      specialRequests: "",
      totalAmount: pricePerPerson.toString(),
    },
  });

  const participants = form.watch("participants");
  const totalAmount = participants * pricePerPerson;

  const bookingMutation = useMutation({
    mutationFn: async (data: TripBookingFormData) => {
      const bookingData = {
        ...data,
        totalAmount: totalAmount.toString(),
      };
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted!",
        description: "Your booking request has been received. I'll confirm availability within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trips"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TripBookingFormData) => {
    bookingMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Book Your Spot</h3>
        <p className="text-gray-600 mb-2">{tripTitle}</p>
        <p className="text-lg font-semibold text-primary">${pricePerPerson} per person</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 8900" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Participants *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="6"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests or Dietary Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any dietary restrictions, medical conditions, or special requests we should know about?"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Booking Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Trip:</span>
                <span>{tripTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Participants:</span>
                <span>{participants}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per person:</span>
                <span>${pricePerPerson}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={bookingMutation.isPending}
            className="w-full py-4 text-lg"
          >
            {bookingMutation.isPending ? "Submitting..." : `Book Now - $${totalAmount}`}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            * A deposit may be required to secure your booking. Full payment details will be provided upon confirmation.
          </p>
        </form>
      </Form>
    </div>
  );
}
