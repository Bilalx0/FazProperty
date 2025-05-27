import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import PropertiesPage from "@/pages/properties";
import PropertyEditPage from "@/pages/properties/edit";
import AgentsPage from "@/pages/agents";
import AgentEditPage from "@/pages/agents/edit";
import DevelopmentsPage from "@/pages/developments";
import DevelopmentEditPage from "@/pages/developments/edit";
import NeighborhoodsPage from "@/pages/neighborhoods";
import NeighborhoodEditPage from "@/pages/neighborhoods/edit";
import ArticlesPage from "@/pages/articles";
import ArticleEditPage from "@/pages/articles/edit";
import EnquiriesPage from "@/pages/enquiries";
import EnquiryDetailPage from "@/pages/enquiries/detail";
import BannerHighlightsPage from "@/pages/banner-highlights";
import BannerHighlightEditPage from "@/pages/banner-highlights/edit";
import DevelopersPage from "@/pages/developers";
import DeveloperEditPage from "@/pages/developers/edit";
import SitemapPage from "@/pages/sitemap";
import SitemapEditPage from "@/pages/sitemap/edit";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      
      {/* Properties routes */}
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/new" component={PropertyEditPage} />
      <Route path="/properties/:id" component={PropertyEditPage} />
      
      {/* Agents routes */}
      <Route path="/agents" component={AgentsPage} />
      <Route path="/agents/new" component={AgentEditPage} />
      <Route path="/agents/:id" component={AgentEditPage} />
      
      {/* Developments routes */}
      <Route path="/developments" component={DevelopmentsPage} />
      <Route path="/developments/new" component={DevelopmentEditPage} />
      <Route path="/developments/:id" component={DevelopmentEditPage} />
      
      {/* Neighborhoods routes */}
      <Route path="/neighborhoods" component={NeighborhoodsPage} />
      <Route path="/neighborhoods/new" component={NeighborhoodEditPage} />
      <Route path="/neighborhoods/:id" component={NeighborhoodEditPage} />
      
      {/* Articles routes */}
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/articles/new" component={ArticleEditPage} />
      <Route path="/articles/:id" component={ArticleEditPage} />
      
      {/* Enquiries routes */}
      <Route path="/enquiries" component={EnquiriesPage} />
      <Route path="/enquiries/:id" component={EnquiryDetailPage} />
      
      {/* Banner Highlights routes */}
      <Route path="/banner-highlights" component={BannerHighlightsPage} />
      <Route path="/banner-highlights/new" component={BannerHighlightEditPage} />
      <Route path="/banner-highlights/:id" component={BannerHighlightEditPage} />
      
      {/* Developers routes */}
      <Route path="/developers" component={DevelopersPage} />
      <Route path="/developers/new" component={DeveloperEditPage} />
      <Route path="/developers/:id" component={DeveloperEditPage} />
      
      {/* Sitemap routes */}
      <Route path="/sitemap" component={SitemapPage} />
      <Route path="/sitemap/new" component={SitemapEditPage} />
      <Route path="/sitemap/:id" component={SitemapEditPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
