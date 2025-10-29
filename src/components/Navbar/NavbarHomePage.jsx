import { useState } from "react";
import "./Navbar.css";

export default function NavbarHomePage() {

  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const handleTabs = (tab) => {
    if (tab === "empresas") {
      setActive(true);
      setActive2(false);
      setActive3(false);
    } else if (tab === "partners") {
      setActive(false);
      setActive2(true);
      setActive3(false);
    } else if (tab === "nosotros") {
      setActive(false);
      setActive2(false);
      setActive3(true);
    }
  };

  return (
    <header>
      <img src="/logo.svg" alt="Logo Fintech NC" />
      <nav>
        <ul>
          <li>
            <a
              href="/"
              className={active ? "active_link" : ""}
              onClick={() => handleTabs("empresas")}
            >
              Empresas
            </a>
          </li>
          <li>
            <a
              href="#"
              className={active2 ? "active_link" : "tabs_link"}
              onClick={() => handleTabs("partners")}
            >
              Partners
            </a>
          </li>
          <li>
            <a
              href="#"
              className={active3 ? "active_link" : ""}
              onClick={() => handleTabs("nosotros")}
            >
              Sobre Nosotros
            </a>
          </li>
        </ul>
      </nav>
      <a href="#">Soporte</a>
    </header>
  );
}
