import './HeroeSection.css';
export default function HeroeSection() {
  return (
    <div className="container heroe text-center p-5 rounded my-5">
      <h1 className="display-4">Webapp Créditos PYMES</h1>
      <p className="lead">
        Sistema de gestión de créditos para pequeñas y medianas empresas
      </p>
      <button className="btn btn-primary btn-lg mt-3">
        Comenzar
      </button>
    </div>
  );
}
