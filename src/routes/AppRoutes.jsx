import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPartners from "../pages/LoginPartners";
import LoginUsers from "../pages/LoginUsers";
import DashboardPage from '../pages/DashboardPage';
import { ClientProfilePage } from "../pages/ClientProfilePage";
import { PartnerProfilePage } from "../pages/PartnerProfilePage";
import PartnerDashboardPage from '../pages/PartnerDashboardPage';
import { getStoredSession, getStoredRole } from "@/auth/authService";

function ProtectedRoute({ children }) {
  const session = getStoredSession();
  if (!session) {
    return <Navigate to="/login-users" replace />;
  }
  return children;
}

function RoleRoute({ children, allowedRoles }) {
  const session = getStoredSession();
  if (!session) return <Navigate to="/login-users" replace />;
  const role = getStoredRole();
  if (!allowedRoles?.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-partners" element={<LoginPartners />} />
      <Route path="/login-users" element={<LoginUsers />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/partner-dashboard" element={
        <RoleRoute allowedRoles={["partner"]}>
          <PartnerDashboardPage />
        </RoleRoute>
      } />
      <Route path="/user/profile" element={<ClientProfilePage />} />
      <Route path="/partner/profile" element={<PartnerProfilePage />} />
    </Routes>
  );
}
