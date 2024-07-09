import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import ProtectedRoute from "./lib/privateRoute";
import ContactPage from "./pages/contact-page";
import DisplayPage from "./pages/display-page";
import Dashboardlayout from "./components/layout/dashboardlayout";

function App() {
  const dispatch = useAppDispatch();
  const userDetails = () => {
    try {
      return JSON.parse(localStorage.getItem("authToken") || "{}");
    } catch (error) {
      return {};
    }
  };
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
          path="/"
          element={
            <ProtectedRoute>
              <Dashboardlayout />
            </ProtectedRoute>
          }>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/display"
            element={
              <ProtectedRoute>
                <DisplayPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
