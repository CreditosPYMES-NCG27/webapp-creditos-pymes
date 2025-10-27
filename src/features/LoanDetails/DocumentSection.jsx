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

export const DocumentSection = ({ loan_documents }) => {

    const [alldocuments, setAllDocuments] = useState(loan_documents);
    const [showAll, setShowAll] = useState(false);

    console.log(alldocuments);
     
    // muestra primeros 5 documentos
    // máximo se permite 10 documentos para no recargar página y hacer leve el proceso
    const displayedDocs = showAll ? alldocuments : alldocuments?.slice(0, 5);

    return (
        <div className="row m-4">
            <div className="col-6">
                <h3 className="subtitle_loan_details_page">Documentos:</h3>
                
                {displayedDocs?.map((doc, index) => (
                    <div key={index} className="row">
                        <div className="col-8">
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
                                <p className={`me-4 mt-3 files_list lh-sm ${doc.status === "approved" ? "text-success" : doc.status === "declined" ? "text-danger" : ""}`}>
                                    {doc.file_name}
                                </p>
                            </div>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                            <ReviewDocumentModal document={doc} />
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
