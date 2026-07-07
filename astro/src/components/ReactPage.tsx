import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { Router } from 'wouter';

import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import ContentCreation from '@/pages/content-creation';
import Consultation from '@/pages/consultation';
import BookPage from '@/pages/book';
import MarketingServices from '@/pages/marketing-services';
import WorkWithMe from '@/pages/work-with-me';
import Destinations from '@/pages/destinations';
import Trips from '@/pages/trips';

const PAGES = {
  home: Home,
  about: About,
  contact: Contact,
  'content-creation': ContentCreation,
  consultation: Consultation,
  book: BookPage,
  'marketing-services': MarketingServices,
  'work-with-me': WorkWithMe,
  destinations: Destinations,
  trips: Trips,
} as const;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function ReactPage({ page }: { page: keyof typeof PAGES }) {
  const Component = PAGES[page];
  if (!Component) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EditModeProvider>
          <Router>
            <Component />
          </Router>
        </EditModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
