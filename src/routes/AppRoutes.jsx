import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPartners from "../pages/LoginPartners";
import LoginUsers from "../pages/LoginUsers";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-partners" element={<LoginPartners />} />
      <Route path="/login-users" element={<LoginUsers />} />
    </Routes>
  );
}
