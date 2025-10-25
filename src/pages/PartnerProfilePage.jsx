import { ProfilePartnerForm } from "../features/ProfilePartners/ProfilePartnerForm";
import Footer from "../components/Footer/Footer";

export const PartnerProfilePage = () =>{

    return(
        <div className="container-fluid p-4">
            <ProfilePartnerForm />
        <Footer />
        </div>
    );
}