import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Blog from "@/pages/Blog";
import DietPlanner from "@/pages/DietPlanner";
import DietChart from "@/pages/DietChart";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import BlogPost from "@/pages/BlogPost";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import Genetics from "./pages/Genetics";

// Article pages
import BlogCattleNutrition from "@/pages/BlogCattleNutrition";
import BlogLivestockDiseases from "@/pages/BlogLivestockDiseases";
import BlogSustainableFeeding from "@/pages/BlogSustainableFeeding";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />

      {/* Blog list */}
      <Route path="/blog" component={Blog} />

      {/* Full article pages (MUST be above /blog/:id) */}
      <Route path="/blog/cattle-nutrition" component={BlogCattleNutrition} />
      <Route path="/blog/livestock-diseases" component={BlogLivestockDiseases} />
      <Route path="/blog/sustainable-feeding" component={BlogSustainableFeeding} />

      {/* Keep dynamic last so it doesn't catch slugs above */}
      <Route path="/blog/:id" component={BlogPost} />

      <Route path="/diet-planner" component={DietPlanner} />
      <Route path="/diet-chart" component={DietChart} />
      <Route path="/about" component={About} />

      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/Genetics" component={Genetics} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ✅ Enforce global base font everywhere */}
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
