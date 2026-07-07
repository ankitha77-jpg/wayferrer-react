import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { EditModeProvider } from '@/contexts/EditModeContext';
import CMSAdminPanel from '@/pages/cms-admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

export default function CmsAdminShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EditModeProvider>
          <CMSAdminPanel />
          <Toaster />
        </EditModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
