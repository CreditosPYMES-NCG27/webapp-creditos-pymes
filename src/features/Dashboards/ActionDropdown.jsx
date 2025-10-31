import { useState } from "react";

// CSS files
import "../../components/Table/Table.css";

//components
import { EditLoanModal } from "../CreateNewLoan/EditLoan";
import { AttachDocumentModal } from "./AttachDocument";

export default function ActionsDropdown({ row, company, isOpen, toggleModal, onSuccess }) {

    const handleBorrar = () => console.log("🗑️ Borrar solicitud:", row.id);

    const canEdit = row.status === "draft";
    const canAttachDocument = row.status === "pending"
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="dropdown text-center">
            <button
                className="btn btn-sm btn-outline-secondary dropdown-toggle border-0 shadow-none fs-4"
                type="button"
                id={`dropdownMenu-${row.id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                ☰
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby={`dropdownMenu-${row.id}`}>
                {canEdit ? (<li>
                    <button
                        className="dropdown-item text-info fw-bold lh-sm bg-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#editLoanModal-${row.id}`}
                    >
                        Editar
                    </button>
                </li>) : null}
                {canAttachDocument ? (<li>
                    <button
                        className="dropdown-item text-success fw-bold lh-sm bg-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#${row.id}attachDocument`}
                    >
                        Adjuntar Documento
                    </button>
                </li>) : null}
                <li>
                    <button
                        className="dropdown-item text-danger fw-bold"
                        type="button"
                        onClick={handleBorrar}
                    >
                        Borrar/ Cancelar
                    </button>
                </li>
            </ul>

            {/* Modal (kept outside dropdown, same behavior as Bootstrap example) */}
            <EditLoanModal
                loanId={row.id}
                company={company}
                modalId={`editLoanModal-${row.id}`}
                onSuccess={onSuccess}
            />

            <AttachDocumentModal 
            loanId={row.id}
            modalId={`${row.id}attachDocument`}/>
        </div>
    );
}
