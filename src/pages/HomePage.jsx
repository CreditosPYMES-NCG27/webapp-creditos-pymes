import HeroSection from "../features/HeroeSection/HeroSection";
import LoanAmount from "../features/HeroeSection/LoanAmount";

const HomePage = () => {
    return (
        <div className="container-fluid p-0 m-0 bg-light"> 
            <HeroSection /> 
            <LoanAmount /> 
        </div>
    );
};

export default HomePage;