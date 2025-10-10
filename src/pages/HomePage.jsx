import HeroSection from "../features/HeroSection/HeroSection";
import LoanAmount from "../features/LoanAmount/LoanAmount";
import Comments from "../components/Comments/Comments";
import { NewLoanBtn } from "../features/CreateNewLoan/NewLoanBtn";

const HomePage = () => {
  return (
    <div className="container-fluid p-0 m-0 bg-light"> 
      <HeroSection /> 
      <LoanAmount /> 
      {/* Sección de reseñas */}
      <div className="container my-5">
        <h5 className="mb-4 fw-bold">Opinión de nuestros clientes</h5>
        <div className="row g-4">
          <div className="col-md-4">
            <Comments 
              rating={5}
              title="Excelente servicio"
              body="Me ayudaron con mi crédito rápido y fácil."
              reviewer="Juan Pérez"
              date="Septiembre 2023"
              avatar="https://i.pravatar.cc/40?img=1"
            />
          </div>
          <div className="col-md-4">
            <Comments 
              rating={4}
              title="Muy recomendable"
              body="Transparencia y buena atención al cliente."
              reviewer="María Gómez"
              date="Octubre 2023"
              avatar="https://i.pravatar.cc/40?img=2"
            />
          </div>
          <div className="col-md-4">
            <Comments 
              rating={5}
              title="Fácil y rápido"
              body="Pude gestionar todo online sin problemas."
              reviewer="Carlos López"
              date="Agosto 2023"
              avatar="https://i.pravatar.cc/40?img=3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
