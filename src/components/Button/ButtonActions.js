import { loginUser } from "../../auth/authService";
import { supabase } from "../../auth/supabaseClient";
import { showError, showSuccess } from "../../services/toastService";
import userServices from "../../services/userServices";

export const ButtonActions = {
  goHome: (navigate) => navigate("/"),
  loginUser: (navigate) => navigate("/login-users"),
  loginPartner: (navigate) => navigate("/login-partners"),
  register: (navigate) => navigate("/sign-up"),
  alert: () => alert("Ejemplo"),

  login: async (navigate, email, password, isPartner = false) => {
    if (!email || !password) {
      showError("Por favor complete usuario y contraseña");
      return;
    }

    // ✅ Iniciar sesión correctamente
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError(error.message || "Error al iniciar sesión.");
      return;
    }

    const user = data.user;
    const session = data.session;

    console.log("Sesión iniciada:", session);
    console.log("Token JWT:", session.access_token);

    //Supabase ya maneja el refresh automático
    localStorage.setItem("sb-session", JSON.stringify(session));

    //Obtener perfil del backend
    try {
      const profile = await userServices.getMyProfile(user.id);

      if (profile && !profile.error) {
        sessionStorage.setItem("user", JSON.stringify(profile));
        showSuccess(`Bienvenido ${user.email}`);
        navigate(isPartner ? "/partner-dashboard" : "/dashboard");
      } else {
        showError(profile?.error || "No se pudo cargar el perfil.");
      }
    } catch (err) {
      console.error(err);
      showError("Error obteniendo el perfil.");
    }

    // Fetch profile in background
    userServices.getMyProfile(user.id)
      .then(profile => sessionStorage.setItem("user", JSON.stringify(profile)))
      .catch(err => console.error(err));
  },
};