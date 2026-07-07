import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Router, Route } from 'wouter';
import TripDetail from '@/pages/trip-detail';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function TripDetailShell({ tripId }: { tripId: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router base="">
          <Route path={`/trips/${tripId}`}>
            <TripDetail />
          </Route>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
