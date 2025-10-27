import { useEffect, useState } from "react";

//CSS files
import './LoanPage.css';
import { updateLoanStatus } from "../../services/creditService";

export const StatusDropDown = ({ loan_details }) => {    

    const [loanData, setLoanData] = useState(loan_details);
    const [open, setOpen] = useState(false);

    const statusTypes = (status) =>{
        if(status === "pending") return "Pendiente";
        if(status === "in_review") return "En revisión";
        if(status === "approved") return "Aprobado";
        if(status === "rejected") return "Rechazado";
    }

    const handleSelect = async (newStatus) => {

        console.log(newStatus);
        
        if (newStatus !== loanData.status) {
            const updatedLoan = await updateLoanStatus(loanData.id, newStatus, loanData);
            
            setLoanData({ ...loanData, status: newStatus });
            return updatedLoan;
        }
        setOpen(false);
    };

    useEffect(() => {


    }, [loanData?.status])

    return (
        <div className="btn-group button_status_size d-flex ms-auto justify-content-between">
            <button
                type="button"
                className={`btn dropdown-toggle ${loanData?.status === "pending"
                    ? "pending_status_dropdown"
                    : loanData?.status === "approved"
                        ? "approved_status_dropdown"
                        : loanData?.status === "in_review"
                            ? "in_review_status_dropdown"
                            : "declined_status_dropdown"
                    }`}
                aria-expanded="false"
                onClick={() => setOpen(!open)}>
                {statusTypes(loanData?.status)}
            </button>
            {open && (
                <ul
                    className={`dropdown-menu dropdown-menu-end mt-5 p-0 ${open ? "show" : ""}`}>
                    <li>
                        <button
                            className="dropdown-item pending_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("pending")}>
                            Pendiente
                        </button>
                    </li>

                    <li>
                        <button
                            className="dropdown-item in_review_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("in_review")}>
                            En revisión
                        </button>
                    </li>

                    <li>
                        <button
                            className="dropdown-item approved_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("approved")}>
                            Aprobado
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item declined_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("rejected")}>
                            Rechazado
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}