import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  LandingPage, 
  ChatPage, 
  SettingsPage, 
  HistoryPage, 
  NotFoundPage 
} from "@/pages";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - No Layout */}
          <Route path="/" element={<LandingPage />} />

          {/* App Pages - With Layout */}
          <Route
            path="/chat"
            element={
              <AppLayout>
                <ChatPage />
              </AppLayout>
            }
          />
          <Route
            path="/history"
            element={
              <AppLayout>
                <HistoryPage />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
