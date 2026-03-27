import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import JobPosting from "./pages/JobPosting";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";
import Shortlist from "./pages/Shortlist";
import SearchResults from "./pages/SearchResults";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/job/:id"} component={JobPosting} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/placeholder"} component={Placeholder} />
      <Route path={"/shortlist"} component={Shortlist} />
      <Route path={"/search"} component={SearchResults} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <TooltipProvider>
          <Toaster position="top-right" richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
