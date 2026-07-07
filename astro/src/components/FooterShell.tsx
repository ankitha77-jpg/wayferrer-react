import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/layout/footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function FooterShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Footer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
