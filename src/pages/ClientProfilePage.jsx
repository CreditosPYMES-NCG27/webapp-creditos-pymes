import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//CSS files
import "../features/ProfileFormClient/ProfileClient.css";

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

//services
import userServices from "../services/userServices.js";

//Components
import { CompanyDetails } from "../features/ProfileFormClient/CompanyDetails";
import { UserDetails } from "../features/ProfileFormClient/UserDetails";

export const ClientProfilePage = () => {

    const [companyForm, setCompanyForm] = useState(true);
    const [userForm, setUserForm] = useState(false);
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState("")

    const checkRole = async () => {
        const profile = await userServices.getMyProfile();

        if(profile){
            setUserDetails(profile)
        }

        console.log(profile);
        

        if (!profile) {
            navigate("/");
            return;
        }

        if (profile.role !== "applicant") {
            alert("No tienes derecho de acceso a esta página.");
            navigate("/dashboard");
            return;
        }
    };

    useEffect(() => {
        checkRole();
    }, []);

    return (
        <div className="container-fluid p-5">
            <div className="d-flex justify-content-center mt-4 mb-2">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        className="btn rounded-0 pb-2 profile_page_form border-0"
                        onClick={() => { setCompanyForm(true); setUserForm(false) }}>
                        <FontAwesomeIcon icon={faHouse} className="icons_profile_page" />
                    </button>
                    <button
                        type="button"
                        className="btn rounded-0 pb-2 profile_page_form border-0"
                        onClick={() => { setCompanyForm(false); setUserForm(true) }}>
                        <FontAwesomeIcon icon={faUser} className="icons_profile_page" />
                    </button>
                </div>

            </div>
            {companyForm ?
                <CompanyDetails />
                :
                <UserDetails 
                id={userDetails.id}
                email={userDetails.email}
                name={userDetails.first_name}
                lastname={userDetails.last_name}
                updated_at={userDetails.updated_at}
                />}
        </div>
    );
}