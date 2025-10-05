import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className="container heroe text-center p-5 rounded my-5">
      <div className="content">
        <h1 className="display-4">
          Soluciones financieras adaptadas a cada etapa de crecimiento
        </h1>
        <button className="btn btn-primary btn-lg mt-3">
          Comenzar
        </button>
      </div>
    </div>
  );
}
