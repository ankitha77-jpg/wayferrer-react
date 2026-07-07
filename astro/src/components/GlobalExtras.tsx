import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { BookPopup } from '@/components/sections/book-popup';
import ChatWidget from '@/components/ChatWidget';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function GlobalExtras() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EditModeProvider>
          <BookPopup />
          <ChatWidget />
        </EditModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
