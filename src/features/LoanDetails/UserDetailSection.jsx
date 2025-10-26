import { useEffect, useState } from 'react';

//CSS files
import './LoanPage.css';

//services
import { getLoanById } from "../../services/creditService.js";
import companyServices from '../../services/companyServices.js';

export const UserDetailSection = ({ loan_id, role }) => {

    const [loanData, setloanData] = useState({
        id: "",
        company_id: "",
        requested_amount: "",
        purpose: "",
        purpose_other: "",
        term_months: "",
        status: "",
        risk_score: "",
        approved_amount: "",
        interest_rate: "",
        created_at: "",
        updated_at: ""
    })

    const [companyDetails, setCompanyDetails] = useState({
        id: "",
        user_id: "",
        legal_name: "",
        tax_id: "",
        contact_email: "",
        contact_phone: "",
        address: "",
        created_at: "",
        updated_at: ""
    });

    const capitalizeFirstLetter = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getLoanDetails = async () => {

        const loan = await getLoanById(loan_id.loan_id || loan_id);

        if (loan) {
            const company = await companyServices.getCompanyById(loan.company_id);

            if (company) {
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
                })

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
                })
            }
        }
    };

    useEffect(() => {
        getLoanDetails();
    }, []);

    return (
        <div className="row m-4">
            <div className="col-6 mt-3 lh-sm p-2">
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
                        { }
                    </p>
                </div>
                <p className="loan_details_text"></p>
                <p className="loan_details_text">Teléfono de la empresa:</p>
                <p className="loan_details_text">Email de la empresa:</p>
                <h5 className="mt-4">Verificación:</h5>
            </div>

            <div className="col-6 align-self-end mt-5">
                <div className='d-flex'>
                    <h5 className='loan_fields_text'>Montón solicitado:</h5>
                    <p className='ms-2 loan_details_text'>{loanData.requested_amount}</p>
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