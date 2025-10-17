
//CSS files
import './LoanPage.css';

export const RequestDocumentBtn = () => {

    return (
        <>
            <button
                type="button"
                className="btn request_document_btn rounded-pill py-0 px-3"
                data-bs-toggle="modal"
                data-bs-target="#requestDocument">
                Solicitar Documento
            </button>

            <div className="modal fade"
                id="requestDocument"
                tabIndex="-1"
                aria-labelledby="requestDocumentLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="requestDocumentLabel">Solicitar Documento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="documentTitle" className="form-label">
                                        Título del documento:
                                    </label>
                                    <input type="text" className="form-control" id="documentTitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comment" className="form-label">
                                        Comentarios:
                                    </label>
                                    <textarea className="form-control" placeholder="Deje un mensaje al cliente" id="comment"></textarea>
                                </div>
                                <div className='d-flex justify-content-around pt-3'>
                                    <button type="button" className="btn btn-danger w-25 p-2" data-bs-dismiss="modal">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn submit_send_btn p-2 w-25">
                                        Solicitar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}