import { useNavigate, useParams } from "react-router-dom";

//CSS files
import '../features/LoanDetails/LoanPage.css';

//services
import userServices from "../services/userServices";

//Components
import { UserDetailSection } from "../features/LoanDetails/UserDetailSection";
import { StatusDropDown } from "../features/LoanDetails/StatusDropDown";
import { DocumentSection } from "../features/LoanDetails/DocumentSection";

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

export const LoanDetailsPage = () => {

    const navigate = useNavigate();
    const loan_id = useParams();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");

    const checkRole = async () => {
        const partner = await userServices.getMyProfile();

        if (!partner) {
            navigate("/");
            return;
        }

        if (partner.role !== "operator") {
            alert("No tienes derecho de acceso a esta página.");
            navigate("/dashboard");
            return;
        }

        setRole(partner.role)
        setLoading(false);
    };

    useEffect(() => {
        checkRole();
    }, []);

    if (loading) return <p className="text-center mt-5 fs-5">Cargando datos...</p>;

    return (
        <div className="container-fluid p-4">
            <button type="button"
                className="btn border-0 m-4"
                onClick={() => { navigate("/partner-dashboard") }}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2 return_to_home_btn" />
                <span className="return_to_home_btn">Volver atrás</span>
            </button>

            <h1 className="text-center mt-4 text-secondary fw-bold">
                Solicitud ID
            </h1>

            <h3 className="text-center mb-4 text-secondary fw-bold">
                {loan_id.loan_id}
            </h3>

            <StatusDropDown />
            <UserDetailSection loan_id={loan_id}/>
            <DocumentSection />

        </div>
    );
}