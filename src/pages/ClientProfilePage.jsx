import { useState } from "react";

//CSS files
import "../features/ProfileFormClient/ProfileClient.css";

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

//Components
import { CompanyDetails } from "../features/ProfileFormClient/CompanyDetails";
import { UserDetails } from "../features/ProfileFormClient/UserDetails";

export const ClientProfilePage = () => {

    const [companyForm, setCompanyForm] = useState(true);
    const [userForm, setUserForm] = useState(false);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center mt-4 mb-2">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button 
                    type="button" 
                    className="btn rounded-0 pb-2 profile_page_form"
                    onClick={() => {setCompanyForm(true); setUserForm(false)}}>
                        <FontAwesomeIcon icon={faHouse} className="icons_profile_page" />
                    </button>
                    <button 
                    type="button" 
                    className="btn rounded-0 pb-2 profile_page_form"
                    onClick={() => {setCompanyForm(false); setUserForm(true)}}>
                        <FontAwesomeIcon icon={faUser} className="icons_profile_page"/>
                    </button>
                </div>
                
            </div>
           {companyForm ?  <CompanyDetails/> : <UserDetails/>}
        </div>
    );
}