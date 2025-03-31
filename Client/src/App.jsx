import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Upload from "./Components/Upload";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import OTPVerification from "./Components/OTPverification";
import ResetPassword from "./Components/ResetPassword";
import News from "./Components/News";
import Articles from "./Components/Articles";
import Weather from "./Components/Weather";
import TermsPrivacyHelp from "./Components/TermsPrivacyHelp";
import LostFound from "./Components/LostFound";
import AdminPanel from "./Components/AdminPanel";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";

// Protected Route for Normal Users
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.isAdmin) return <Navigate to="/admin" replace />;
  return children;
};

// Protected Admin Route
const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!user?.isAdmin) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Normal User Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Navbar />
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <Navbar />
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Navbar />
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <Navbar />
                <Articles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lost&found"
            element={
              <ProtectedRoute>
                <Navbar />
                <LostFound />
              </ProtectedRoute>
            }
          />
          <Route
            path="/terms-privacy-help"
            element={
              <ProtectedRoute>
                <Navbar />
                <TermsPrivacyHelp />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;