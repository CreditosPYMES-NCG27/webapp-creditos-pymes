import UserDashboard from "../features/Dashboards/UserDashboard";

export default function DashboardPage() {
  // Aquí en el futuro validaremos el token
  // const token = localStorage.getItem('userToken');
  // if (!token) navigate('/login-users');
  
  return <UserDashboard />;
}