import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog/[slug]";
import Contact from "./pages/contact";
import Analytics from "./pages/dashboard/analytics";
import BlogDashboard from "./pages/dashboard/blog";
import BlogEditor from "./pages/dashboard/blog/editor";
import ProfilePage from "./pages/dashboard/profile";
import EarlyAccess from "./pages/early-access";
import Feature from "./pages/feature";
import GererAbonnementPage from "./pages/gerer-abonnement";
import Home from "./pages/home";
import Integration from "./pages/integration";
import IntegrationDetailsPage from "./pages/integration/[slug]";
import CGVPage from "./pages/legal/cgv";
import ConfidentialitePage from "./pages/legal/confidentialite";
import MentionsLegalesPage from "./pages/legal/mentions-legales";
import LoginPage from "./pages/login";
import MerciPage from "./pages/merci";
import NotFound from "./pages/not-found";
import Pricing from "./pages/pricing";
import ProfessionalPricing from "./pages/pricing/professional";
import StarterPricing from "./pages/pricing/starter";
import SignupPage from "./pages/signup";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feature" element={<Feature />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing/starter" element={<StarterPricing />} />
              <Route path="/pricing/professional" element={<ProfessionalPricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/integration" element={<Integration />} />
              <Route path="/integration/:slug" element={<IntegrationDetailsPage />} />
              <Route path="/early-access" element={<EarlyAccess />} />
              <Route path="/merci" element={<MerciPage />} />
              <Route path="/gerer-abonnement" element={<GererAbonnementPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/blog" element={<BlogDashboard />} />
              <Route path="/dashboard/blog/new" element={<BlogEditor />} />
              <Route path="/dashboard/blog/edit/:id" element={<BlogEditor />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/legal/cgv" element={<CGVPage />} />
              <Route path="/legal/confidentialite" element={<ConfidentialitePage />} />
              <Route path="/legal/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
