export const ButtonActions = {
  goHome: (navigate) => navigate("/"),
  loginUser: (navigate) => navigate("/login/user"),
  loginPartner: (navigate) => navigate("/login/partner"),
  register: (navigate) => navigate("/register"),
  alert: () => alert("Ejemplo"),
  login: (navigate, email, password) => {
    if (!email || !password) {
      alert("Por favor complete usuario y contraseña ❌");
      return;
    }
    if (email === "admin@test.com" && password === "1234") {
      alert("✅ Login correcto");
      navigate("/");
    } else {
      alert("Credenciales incorrectas ❌");
    }
  }
};
