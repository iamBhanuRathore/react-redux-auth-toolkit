import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
