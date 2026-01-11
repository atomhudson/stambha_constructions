import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Founder from "./pages/Founder";
import Interior from "./pages/Interior";
import ProjectDetail from "./pages/ProjectDetail";
import Materials from "./pages/Materials";
import Unique from "./pages/Unique";
import Sites from "./pages/Sites";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ResidentialConstruction from "./pages/ResidentialConstruction";
import CommercialProjects from "./pages/CommercialProjects";
import InteriorDesignService from "./pages/InteriorDesignService";
import RenovationRestoration from "./pages/RenovationRestoration";
import Consultancy from "./pages/Consultancy";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/interior" element={<Interior />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/unique" element={<Unique />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/auth" element={<Auth />} /> {/* Keeping for potentially other usages or just obscure it completely */}
            <Route path="/admin-portal-login" element={<Auth />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/services/residential" element={<ResidentialConstruction />} />
            <Route path="/services/commercial" element={<CommercialProjects />} />
            <Route path="/services/interior-design" element={<InteriorDesignService />} />
            <Route path="/services/renovation" element={<RenovationRestoration />} />
            <Route path="/services/consultancy" element={<Consultancy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
