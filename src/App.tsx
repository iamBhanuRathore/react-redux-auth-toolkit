import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import ProtectedRoute from "./lib/privateRoute";

function App() {
  const dispatch = useAppDispatch();
  const userDetails = () => {
    try {
      return JSON.parse(localStorage.getItem("authToken") || "{}");
    } catch (error) {
      return {};
    }
  };
  console.log(userDetails);
  useEffect(() => {
    if (userDetails()?.name && userDetails()?.token) {
      dispatch(setUser(userDetails()));
    }
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route
          path="/auth"
          element={
            <ProtectedRoute shouldProtect={false}>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
