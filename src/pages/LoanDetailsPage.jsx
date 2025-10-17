import { useNavigate, useParams } from "react-router-dom";

//CSS files
import '../features/LoanDetails/LoanPage.css';

//Components
import { UserDetailSection } from "../features/LoanDetails/UserDetailSection";
import { StatusDropDown } from "../features/LoanDetails/StatusDropDown";
import { DocumentSection } from "../features/LoanDetails/DocumentSection";

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const LoanDetailsPage = () => {

    const navigate = useNavigate();
    const loan_id = useParams();

    const getLoanDetails = async () => {
        try {
            const loadLoan = await fetch("/api/v1/credit-applications/" + loan_id);
            if (!loadLoan) return;

            const data = await loadLoan.json();

            if (!loadLoan.ok) {
                return { error: data.error || "Could not fetch loan details" }
            }

            return data;

        } catch (error) {
            console.error("Error fetching loan details:", error);
            return { error: "Request failed" };
        }
    };

    return (
        <div className="container-fluid p-4">
            <button type="button"
                className="btn border-0 m-4"
                onClick={() => { navigate("/dashboard") }}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2 return_to_home_btn" />
                <span className="return_to_home_btn">Volver atrás</span>
            </button>

            <div className="d-flex me-5">
                <img
                    src="https://randomuser.me/api/portraits/lego/4.jpg"
                    alt="user"
                    className="partner_user_img mb-3 border border-2 ms-auto"
                    style={{ cursor: 'pointer' }}
                />
                <div className="ms-4 mt-4">
                    <p className="m-0">Operador1</p>
                    <p className="m-0">Status</p>
                </div>
            </div>

            <h1 className="text-center m-4 text-secondary fw-bold">
                Solicitud ID ##12346
            </h1>

            <StatusDropDown />

            <UserDetailSection />

            <DocumentSection />

        </div>
    );
}