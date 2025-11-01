import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import userServices from "../services/userServices.js";
import { showError } from "../services/toastService.jsx";

export const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("sb-token");
  const [loading, setLoading] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        showError("Usuario no autenticado, por favor haz log in.");
        setLoading(false);
        return;
      }

      if (user.role === allowedRole) {
        setIsAuthorized(true);
      } else {
        showError("Acceso no autorizado.");
      }

      setLoading(false);
    };

    checkAuth();
  }, [allowedRole]);

  if (loading) return <p>Cargando...</p>;
  if (!isAuthorized) return <Navigate to="/" replace />;

  return <Outlet />;
};