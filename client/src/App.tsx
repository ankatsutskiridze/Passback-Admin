import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AccountsManagement from "@/pages/accounts";
import CampaignsManagement from "@/pages/campaigns";
import CreativesManagement from "@/pages/creatives";
import ClientProfile from "@/pages/client-profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/campaigns" component={CampaignsManagement} />
      <Route path="/accounts" component={AccountsManagement} />
      <Route path="/client/:id" component={ClientProfile} />
      <Route path="/creatives" component={CreativesManagement} />
      <Route path="/billing" component={Dashboard} />
      <Route path="/reports" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />
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
