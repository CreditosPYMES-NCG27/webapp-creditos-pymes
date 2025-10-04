import './HeroeSection.css';

export default function HeroeSection() {
  return (
    <div className="container heroe text-white text-center">
      <div className="content">
        <h1 className="display-6">
          Soluciones financieras adaptadas a cada etapa de crecimiento
        </h1>
        <div className="mt-4">
          <button className="btn btn-primary btn-lg me-3">
            Iniciar sesión
          </button>
          <button className="btn btn-outline-light btn-lg">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
