import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPartners from "../pages/LoginPartners";
import LoginUsers from "../pages/LoginUsers";
import DashboardPage from '../pages/DashboardPage';
import { ClientProfilePage } from "../pages/ClientProfilePage";
import { PartnerProfilePage } from "../pages/PartnerProfilePage";
import PartnerDashboardPage from '../pages/PartnerDashboardPage';
import NotificationsDemo from '../pages/NotificationsDemo';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-partners" element={<LoginPartners />} />
      <Route path="/login-users" element={<LoginUsers />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
      <Route path="/user/profile" element={<ClientProfilePage />} />
      <Route path="/partner/profile" element={<PartnerProfilePage />} />
      <Route path="/notifications" element={<NotificationsDemo />} />
    </Routes>
  );
}
