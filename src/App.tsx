import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "./app/hooks";
import { useLayoutEffect } from "react";
import { setUser } from "./features/authSlice";
import { VerifyUser } from "./lib/verifyUser";

function App() {
  const dispatch = useAppDispatch();
  const userDetails = JSON.parse(localStorage.getItem("authToken") || "{}");
  useLayoutEffect(() => {
    dispatch(setUser(userDetails));
  }, []);
  return (
    <>
      <Toaster />
      {/* <VerifyUser /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
