import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//features
import { ProfilePartnerForm } from "../features/ProfilePartners/ProfilePartnerForm";

//services
import userServices from "../services/userServices";

export const PartnerProfilePage = () => {

    const navigate = useNavigate();
    const [partnerDetails, setPartnerDetails] = useState("");
    const [loading, setLoading] = useState(true);

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

        setPartnerDetails(partner);
        setLoading(false);
    };

    useEffect(() => {
        checkRole();
    }, []);

    if (loading) return <p className="text-center mt-5 fs-5">Cargando datos...</p>;

    return (
        <div className="container-fluid p-4">
            <h1 className="text-center my-4 partner_profile_title">Mi Perfil</h1>
            <ProfilePartnerForm
                operator={partnerDetails}
            />
        </div>
    );
}