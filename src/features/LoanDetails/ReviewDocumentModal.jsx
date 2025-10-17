

export const ReviewDocumentModal = () => {

    return (
        <>
            <button
                type="button"
                className="btn border-0 m-0 review_document_btn"
                data-bs-toggle="modal"
                data-bs-target="#reviewDocument">
                Revisar
            </button>

            <div
                className="modal fade"
                id="reviewDocument"
                tabIndex="-1"
                aria-labelledby="reviewDocumentLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header p-3">
                            <h5 className="modal-title">
                                Revisar Documento:
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-4">
                            <h6 className="fw-bold mb-4 mt-2">
                                Document1
                            </h6>
                            <iframe
                                src="https://www.orimi.com/pdf-test.pdf"
                                title="Documento"
                                className="documentView"
                            ></iframe>
                        </div>
                        <div className="modal-footer d-flex justify-content-between px-5 py-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal">
                                Rechazar
                            </button>
                            <button
                                type="button"
                                className="btn btn-success">
                                Aprobar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}