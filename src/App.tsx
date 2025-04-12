
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useState, useEffect } from "react";
import SplashLoader from "./components/SplashLoader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Show loader for 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading ? (
            <SplashLoader />
          ) : (
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="room/:id" element={<Room />} />
                    <Route path="create" element={<CreateRoom />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
