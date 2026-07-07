import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';
import { EditModeProvider } from '@/contexts/EditModeContext';
import Navbar from '@/components/layout/navbar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
  },
});

export default function NavbarShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditModeProvider>
        <Router>
          <Navbar />
        </Router>
      </EditModeProvider>
    </QueryClientProvider>
  );
}
