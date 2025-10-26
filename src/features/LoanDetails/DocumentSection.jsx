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
                    <div key={doc.value} className="row">
                        <div className="col-8">
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
                                <p className={`me-4 mt-3 files_list lh-sm ${doc.status == "Aprobado" ? "text-success" : doc.status == "Rechazado" ? "text-danger" : ""}`}>
                                    {doc.label}
                                </p>

                            </div>
                        </div>
                        <div className="col-4">
                            <ReviewDocumentModal />
                        </div>
                    </div>
                ))}

            </div>
            <div className="col-6 d-flex justify-content-center align-self-center">
                <div className="row d-flex">
                    <div className="col-12 mb-2 d-flex justify-content-center">
                        <RequestDocumentBtn />
                    </div>
                    <div className="col-12 mt-2 d-flex justify-content-center">
                        <RequestSignatureBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}