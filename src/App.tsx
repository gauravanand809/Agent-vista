import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { InterviewProvider } from "@/contexts/InterviewContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewLive from "./pages/InterviewLive";
import InterviewResult from "./pages/InterviewResult";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavFooter = ['/login', '/signup', '/interview/live'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavFooter && <Navbar />}
      <main className={hideNavFooter ? '' : 'flex-1'}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InterviewProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/interview/setup" element={
                  <ProtectedRoute>
                    <InterviewSetup />
                  </ProtectedRoute>
                } />
                <Route path="/interview/live" element={
                  <ProtectedRoute>
                    <InterviewLive />
                  </ProtectedRoute>
                } />
                <Route path="/interview/result" element={
                  <ProtectedRoute>
                    <InterviewResult />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </InterviewProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
