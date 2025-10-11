import { loginUser } from "@/auth/authService";

export const ButtonActions = {
  goHome: (navigate) => navigate("/"),
  loginUser: (navigate) => navigate("/login-users"),
  loginPartner: (navigate) => navigate("/login-partners"),
  register: (navigate) => navigate("/register"),
  alert: () => alert("Ejemplo"),

  login: async (navigate, email, password) => {
    if (!email || !password) {
      alert("Por favor complete usuario y contraseña ❌");
      return;
    }

    const { user, session, error } = await loginUser(email, password);

    if (error) {
      alert(`❌ Error: ${error.message}`);
      return;
    }

    alert(`✅ Bienvenido ${user.email}`);
    navigate("/dashboard");
  },
};
