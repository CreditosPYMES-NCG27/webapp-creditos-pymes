import { useLocation } from "react-router-dom";
import NavbarLoginUser from "./NavbarLoginUser";
import NavbarDashboard from "./NavbarDashboard";
import NavbarHomePage from "./NavbarHomePage";

export default function Navbar() {
  const location = useLocation();

  if (location.pathname === "/login-users" ) {
    return <NavbarLoginUser />;
  } else if (location.pathname.startsWith("/dashboard")) {
    return <NavbarDashboard />;
  } else if (location.pathname.startsWith("/sign-in")){
    return <NavbarLoginUser />;
  } else {
    return <NavbarHomePage />;
  }
}
