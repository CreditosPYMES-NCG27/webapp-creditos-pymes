import { useState } from "react";

//CSS files
import './LoanPage.css';

export const StatusDropDown = () => {

    const [status, setStatus] = useState("Pendiente");
    const [open, setOpen] = useState(false);

    const handleSelect = (newStatus) => {
        setStatus(newStatus);
        setOpen(false);
    };

    return (
        <div className="btn-group button_status_size d-flex ms-auto justify-content-between">
            <button
                type="button"
                className={`btn dropdown-toggle ${status === "Pendiente"
                    ? "pending_status_dropdown"
                    : status === "Aprobado"
                        ? "approved_status_dropdown"
                        : "declined_status_dropdown"
                    }`}
                aria-expanded="false"
                onClick={() => setOpen(!open)}>
                {status}
            </button>
            {open && (
                <ul
                    className="dropdown-menu dropdown-menu-end show mt-5 p-0">
                    <li>
                        <button
                            className="dropdown-item pending_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("Pendiente")}>
                            Pendiente
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item approved_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("Aprobado")}>
                            Aprobado
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item declined_status_dropdown py-2"
                            type="button"
                            onClick={() => handleSelect("Rechazado")}>
                            Rechazado
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}