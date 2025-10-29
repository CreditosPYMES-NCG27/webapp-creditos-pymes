import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { Layout } from "../pages/Layout";
import HomePage from "../pages/HomePage";
import LoginUsers from "../pages/LoginUsers";
import DashboardPage from '../pages/DashboardPage';
import { getStoredSession, getStoredRole } from "@/auth/authService";
import { LoginPartners } from "../pages/LoginPartners";
import { PartnerDashboardPage } from "../pages/PartnerDashboardPage";
import { ClientProfilePage } from "../pages/ClientProfilePage";
import { PartnerProfilePage } from "../pages/PartnerProfilePage";
import { LoanDetailsPage } from "../pages/LoanDetailsPage";

// function ProtectedRoute({ children }) {
//   const session = getStoredSession();
//   if (!session) return <Navigate to="/login-users" replace />;
//   return children;
// }

// function RoleRoute({ children, allowedRoles }) {
//   const session = getStoredSession();
//   if (!session) return <Navigate to="/login-users" replace />;
//   const role = getStoredRole();
//   if (!allowedRoles?.includes(role)) return <Navigate to="/" replace />;
//   return children;
// }

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not Found</h1>}>
      <Route index element={<HomePage />} />
      <Route path="login-users" element={<LoginUsers />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="login-partners" element={<LoginPartners />} />
      <Route path="partner-dashboard" element={<PartnerDashboardPage />} />
      <Route path="user/profile" element={<ClientProfilePage />} />
      <Route path="partner/profile" element={<PartnerProfilePage />} />
      <Route path="partner/loan-details/:loan_id" element={<LoanDetailsPage />} />
    </Route>
  ),
  {
    future: { v7_startTransition: true }
  }
);
