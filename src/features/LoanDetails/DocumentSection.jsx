
//Components
import { ReviewDocumentModal } from "./ReviewDocumentModal";


export const DocumentSection = () => {

    return (
        <div className="row">
            <div className="col-6">
                <h3 className="subtitle_loan_details_page">Documentos:</h3>
                <div className="d-flex">
                    <p className="me-4 mt-3">Lista de documentos aquí</p>
                    <ReviewDocumentModal />
                </div>
            </div>
            <div className="col-6 d-flex justify-content-center">
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button">
                        Solicitar Documento
                    </button>
                    <button className="btn btn-primary" type="button">
                        Solicitar Firma
                    </button>
                    <button className="btn btn-primary" type="button">
                        Enviar Justificante
                    </button>
                </div>
            </div>
        </div>
    );
}