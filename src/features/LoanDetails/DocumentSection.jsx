import { useState } from 'react';

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

export const DocumentSection = ({ loan_documents, loan_id }) => {

    const [alldocuments, setAllDocuments] = useState(loan_documents);
    const [showAll, setShowAll] = useState(false);

    console.log(alldocuments);

    // muestra primeros 5 documentos
    // máximo se permite 10 documentos para no recargar página y hacer leve el proceso
    const displayedDocs = showAll ? alldocuments : alldocuments?.slice(0, 5);

    const documentType = (document_type) =>{
        if(document_type === "tax_return") return "Impuestos";
        if(document_type === "financial_statement") return "Finanzas";
        if(document_type === "bank_statement") return "Banco";
        if(document_type === "id_document") return "Identidad";
        if(document_type === "business_license") return "Licencia";
        return "Otros";
    }

    return (
        <div className="row m-4">
            <div className="col-6">
                <h3 className="subtitle_loan_details_page">Documentos:</h3>

                {displayedDocs?.map((doc) => (
                    <div key={doc.id} className="row">
                        <div className="col-9">
                            <div className="d-flex align-items-center">
                                {doc.status === "approved"
                                    ? <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        className='fs-5 text-success d-flex align-self-center m-0 me-2' />
                                    : doc.status === "declined"
                                        ? <FontAwesomeIcon
                                            icon={faSquareXmark}
                                            className='fs-5 text-danger d-flex align-self-center m-0 me-2' />
                                        : ""
                                }
                                <p className={`me-4 mt-3 d-flex files_list lh-sm ${doc.status === "approved" ? "text-success" : doc.status === "declined" ? "text-danger" : ""}`}>
                                    <span className="badge bg-secondary me-2">
                                        {documentType(doc.document_type)}
                                    </span>
                                    {doc.file_name.length > 20
                                        ? doc.file_name.slice(0, 20) + "…"
                                        : doc.file_name}
                                </p>
                            </div>
                        </div>
                        <div className="col-3 d-flex align-items-center">
                            <ReviewDocumentModal
                                document_path={doc.storage_path}
                                loan_id={loan_id}
                                document_title={doc.file_name}
                                modalId={`reviewDocument-${doc.id}`}
                            />
                        </div>
                    </div>
                ))}

                {alldocuments?.length > 5 && (
                    <button
                        className="btn btn-link p-0 mt-2"
                        onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Ver menos" : `Ver más (${alldocuments.length - 5})`}
                    </button>
                )}
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
