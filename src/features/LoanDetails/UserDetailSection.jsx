import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//CSS
import './LoanPage.css';

//services
import { getLoanById } from "../../services/creditService.js";
import companyServices from '../../services/companyServices.js';
import userServices from '../../services/userServices.js';

export const UserDetailSection = ({ loan_id }) => {
    const navigate = useNavigate();
    const loanId = loan_id?.loan_id || loan_id;

    const [loanData, setloanData] = useState({});
    const [companyDetails, setCompanyDetails] = useState({});
    const [representative, setRepresentative] = useState({});

    const capitalizeFirstLetter = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    const loadLoan = async (application_id) => {
        const loan = await getLoanById(application_id);
        if (!loan) return null;

        setloanData({
            id: loan.id,
            company_id: loan.company_id,
            requested_amount: loan.requested_amount,
            purpose: loan.purpose,
            purpose_other: loan.purpose_other,
            term_months: loan.term_months,
            status: loan.status,
            risk_score: loan.risk_score,
            approved_amount: loan.approved_amount,
            interest_rate: loan.interest_rate,
            created_at: loan.created_at,
            updated_at: loan.updated_at
        });

        return loan;
    };

    const loadCompany = async (company_id) => {
        const company = await companyServices.getCompanyById(company_id);
        if (!company) return null;

        setCompanyDetails({
            id: company.id,
            user_id: company.user_id,
            legal_name: company.legal_name,
            tax_id: company.tax_id,
            contact_email: company.contact_email,
            contact_phone: company.contact_phone,
            address: `${company?.address?.street}, ${company?.address?.city}, ${company?.address?.state}, ${company?.address?.zip_code}, ${company?.address?.country}`,
            created_at: company.created_at,
            updated_at: company.updated_at
        });

        return company;
    };

    const loadClient = async (user_id) => {
        const profile = await userServices.getProfileById(user_id);
        if (!profile) return null;

        setRepresentative({
            name: `${profile.first_name} ${profile.last_name}`,
            email: profile.email
        });

        return profile;
    };

    // Función que organiza el flujo
    const loadLoanDetailsSequence = async (loanId) => {
        try {
            const loan = await loadLoan(loanId);
            if (!loan) {
                navigate("/partner-dashboard");
                return;
            }

            const company = await loadCompany(loan.company_id);
            if (!company) return;

            await loadClient(company.user_id);
        } catch (err) {
            console.error("Error obteniendo detalles del préstamo:", err);
            navigate("/partner-dashboard");
        }
    };

    // En useEffect
    useEffect(() => {
        loadLoanDetailsSequence(loanId);
    }, []);


    return (
        <div className="row m-4">
            <div className="col-md-6 mt-3 lh-sm p-2">
                <h3 className="mb-4 subtitle_loan_details_page">Detalles Empresa:</h3>

                <div className='d-flex'>
                    <p className="loan_fields_text">Nombre de la empresa:</p>
                    <p className='ms-2 loan_details_text capitalize'>{companyDetails.legal_name}</p>
                </div>

                <div className='d-flex'>
                    <p className="loan_fields_text">Número fiscal de la empresa:</p>
                    <p className='ms-2 loan_details_text'>{companyDetails.tax_id}</p>
                </div>

                <div className='d-flex'>
                    <p className="loan_fields_text">Dirección:</p>
                    <p className='ms-2 loan_details_text'>{companyDetails.address}</p>
                </div>
            </div>

            <div className="col-6 mt-4 lh-sm p-2">
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Representante:</h5>
                    <p className='ms-2 loan_details_text'>
                        {representative.name}
                    </p>
                </div>
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Email representante:</h5>
                    <p className='ms-2 loan_details_text'>
                        {representative.email}
                    </p>
                </div>
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Teléfono de la empresa:</h5>
                    <p className='ms-2 loan_details_text'>
                        {companyDetails.contact_phone}
                    </p>
                </div>
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Email de la empresa:</h5>
                    <p className='ms-2 loan_details_text'>
                        {companyDetails.contact_email}
                    </p>
                </div>
                <h5 className="mt-4">Verificación: FALTA</h5>
            </div>

            <div className="col-6 align-self-end mt-3">
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Montón solicitado:</h5>
                    <p className='ms-2 loan_details_text text-success fw-bold'>
                        {loanData.requested_amount}
                    </p>
                </div>
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Finalidad del crédito:</h5>
                    <p className='ms-2 loan_details_text'>
                        {loanData.purpose == "other" ? `${capitalizeFirstLetter(loanData.purpose)} - ${capitalizeFirstLetter(loanData.purpose_other)}` : capitalizeFirstLetter(loanData.purpose)}
                    </p>
                </div>
            </div>

        </div>
    );
}