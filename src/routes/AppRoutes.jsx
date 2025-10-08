import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPartners from "../pages/LoginPartners";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-partners" element={<LoginPartners />} />
    </Routes>
  );
}
