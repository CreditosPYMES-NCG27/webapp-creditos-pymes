import { loginUser } from "@/auth/authService";

export const ButtonActions = {
  goHome: (navigate) => navigate("/"),
  loginUser: (navigate) => navigate("/login-users"),
  loginPartner: (navigate) => navigate("/login-partners"),
  register: (navigate) => navigate("/register"),
  alert: () => alert("Ejemplo"),

  login: async (navigate, email, password, isPartner = false, showNotification = null) => {
    if (!email || !password) {
      if (showNotification) {
        showNotification.showError("Por favor complete usuario y contraseña");
      } else {
        alert("Por favor complete usuario y contraseña ❌");
      }
      return;
    }

    const { user, session, error } = await loginUser(email, password, showNotification);

    if (error) {
      // La notificación de error ya se maneja en loginUser si se proporciona showNotification
      if (!showNotification) {
        alert(`❌ Error: ${error.message}`);
      }
      return;
    }

    // La notificación de éxito ya se maneja en loginUser si se proporciona showNotification
    if (!showNotification) {
      alert(`✅ Bienvenido ${user.email}`);
    }
    
    if (isPartner) {
      navigate("/partner-dashboard");
    } else {
      navigate("/dashboard");
    }
  },
};