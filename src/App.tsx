import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Destinations from "@/pages/Destinations";
import Bookings from "@/pages/Bookings";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AnimatedRoutes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
