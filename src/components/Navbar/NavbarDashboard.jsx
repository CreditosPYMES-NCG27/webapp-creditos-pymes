import "./Navbar.css";

export default function NavbarDashboard() {
  return (
    <header>
      <img src="/logo.svg" alt="Logo Fintech NC" />
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/perfil">Mi Perfil</a></li>
          <li><a href="">Ayuda</a></li>
        </ul>
        <button>Log Out</button>
      </nav>
    </header>
  );
}
