import Login from "../components/Login/Login";
import "@/components/Login/Login.css";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const LoginUsers = () => {
  return (
    <div className="d-flex flex-column login-root">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Columna izquierda con imagen */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light p-0">
            <img
              src="/src/assets/images/bg-login.webp"
              alt="Login ilustración"
              className="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>

          {/* Columna derecha con login */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <Login />
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default LoginUsers;
