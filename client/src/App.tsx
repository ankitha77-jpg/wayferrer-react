import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EditModeProvider } from "@/contexts/EditModeContext";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { BookBanner } from "@/components/sections/book-banner";
import { BookTopBanner } from "@/components/sections/book-top-banner";
import { BookPopup } from "@/components/sections/book-popup";
import ChatWidget from "@/components/ChatWidget";
import Home from "@/pages/home";
import About from "@/pages/about";
import Destinations from "@/pages/destinations";
import Trips from "@/pages/trips";
import TripDetail from "@/pages/trip-detail";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import BookPage from "@/pages/book";
import WorkWithMePage from "@/pages/work-with-me";
import ConsultationPage from "@/pages/consultation";
import ContentCreation from "@/pages/content-creation";
import MarketingServices from "@/pages/marketing-services";
import CMSAdminPanel from "@/pages/cms-admin";
import ClientPortal from "@/pages/client-portal";
import NotFound from "@/pages/not-found";
import BlogPost from "@/pages/blog-post";
import DestinationContinent from "@/pages/destination-continent";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/destinations/:continent" component={DestinationContinent} />
      <Route path="/trips" component={Trips} />
      <Route path="/trips/:id" component={TripDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/book" component={BookPage} />
      <Route path="/work-with-me" component={WorkWithMePage} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/content-creation" component={ContentCreation} />
      <Route path="/marketing-services" component={MarketingServices} />
      <Route path="/contact" component={Contact} />
      <Route path="/cms-admin" component={CMSAdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/client-portal">
            <ClientPortal />
          </Route>
          <Route>
            <EditModeProvider>
              <div className="min-h-screen flex flex-col">
                <BookTopBanner />
                <Navbar />
                <ScrollToTop />
                <main className="flex-1">
                  <Router />
                </main>
                <Footer />
              </div>
              <BookPopup />
              <ChatWidget />
            </EditModeProvider>
          </Route>
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
