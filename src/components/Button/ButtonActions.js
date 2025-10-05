export const ButtonActions = {
  goHome: (navigate) => navigate("/"),
  loginUser: (navigate) => navigate("/login/user"),
  loginPartner: (navigate) => navigate("/login/partner"),
  register: (navigate) => navigate("/register"),
  alert: () => alert("Ejemplo"),
  // validateForm: () => {
  //   const campo1 = "valor1"; 
  //   const campo2 = "";       
  //   const campo3 = "valor3"; 
  //   if (campo1 && campo2 && campo3) {
  //     alert("Todos los campos completados ✅");
  //   } else {
  //     alert("Faltan campos ❌");
  //   }
  // }
};
