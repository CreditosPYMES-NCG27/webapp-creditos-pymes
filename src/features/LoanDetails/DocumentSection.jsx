//CSS files
import './LoanPage.css';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

//Components
import { ReviewDocumentModal } from "./ReviewDocumentModal";
import { RequestDocumentBtn } from './RequestDocumentBtn';
import { RequestSignatureBtn } from './RequestSignatureBtn';

export const DocumentSection = () => {

    const documentList = [
        { value: 1, label: "Estados financieros recientes", status: "Aprobado" },
        { value: 2, label: "Extractos bancarios", status: "Rechazado" },
        { value: 3, label: "Informes contables (opcional)", status: "Pendiente" },
    ]

    return (
        <div className="row m-4">
            <div className="col-6">
                <h3 className="subtitle_loan_details_page">Documentos:</h3>
                {documentList.map(doc => (
                    <div className="d-flex">
                        {doc.status == "Aprobado"
                            ? <FontAwesomeIcon
                                icon={faSquareCheck}
                                className='fs-5 text-success d-flex align-self-center m-0 me-2' />
                            : doc.status == "Rechazado"
                                ? <FontAwesomeIcon
                                    icon={faSquareXmark}
                                    className='fs-5 text-danger d-flex align-self-center m-0 me-2' />
                                : ""
                        }
                        <p key={doc.value} 
                        className={`me-4 mt-3 files_list lh-sm ${doc.status == "Aprobado" ? "text-success" : doc.status == "Rechazado" ? "text-danger" : ""}`}>
                            {doc.label}
                        </p>
                        <ReviewDocumentModal />
                    </div>
                ))}

            </div>
            <div className="col-6 d-flex justify-content-center">
                <div className="d-grid gap-2">
                    <RequestDocumentBtn />
                    <RequestSignatureBtn />
                    <button className="btn btn-primary" type="button">
                        Enviar Justificante
                    </button>
                </div>
            </div>
        </div>
    );
}