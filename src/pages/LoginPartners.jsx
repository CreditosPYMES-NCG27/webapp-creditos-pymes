import Login from "../components/Login/Login";

const LoginPartners = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header lo hace tu compañero */}

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Columna izquierda con imagen */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light">
            <img
              src="/src/assets/images/login2.webp"
              alt="Login ilustración"
              className="img-fluid"
            />
          </div>

          {/* Columna derecha con login */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <Login />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        <p className="mb-0">&copy; 2025 Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default LoginPartners;
