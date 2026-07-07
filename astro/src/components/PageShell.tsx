import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { Router } from 'wouter';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EditModeProvider>
          <Router>
            {children}
          </Router>
        </EditModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
