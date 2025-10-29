
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//auth service
import { supabase } from '@/auth/supabaseClient';

export const ReviewDocumentModal = ({ document_path, modalId, document_title, loan_id }) => {

    const [signedUrl, setSignedUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const getDocumentSignedUrl = async (path) => {
        const { data, error } = await supabase
            .storage
            .from('documents')
            .createSignedUrl(path, 60);

        if (error) {
            console.error("Supabase error:", error);
            return null; // evita que falle al acceder a signedUrl
        }

        if (!data || !data.signedUrl) {
            console.warn("No se pudo generar signedUrl para:", path);
            return null;
        }

        return data.signedUrl;
    };

    useEffect(() => {
        const fetchSignedUrl = async () => {
            if (!document_path) return;

            setLoading(true);
            try {
                const url = await getDocumentSignedUrl(document_path);
                setSignedUrl(url);
            } catch (err) {
                console.error("Error getting signed URL:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSignedUrl();
    }, [document_path, loan_id]);

    return (
        <>
            <button
                type="button"
                className="btn border-0 m-0 review_document_btn"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}>
                Revisar
            </button>

            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={`reviewDocumentLabel-${modalId}`}
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
                                aria-label="Close"
                                onClick={() => { document.activeElement?.blur() }}></button>
                        </div>

                        <div className="modal-body p-4">
                            <h6 className="fw-bold mb-4 mt-2">
                                {document_title}
                            </h6>
                            {loading ? (
                                <p className="fs-5 text-center">Cargando documento...</p>
                            ) : signedUrl ? (
                                <iframe
                                    src={signedUrl}
                                    title="Documento"
                                    className="documentView"
                                ></iframe>
                            ) : (
                                <p className='fs-5 text-center'>No se pudo cargar el documento.</p>
                            )}

                        </div>
                        <div className="modal-footer d-flex justify-content-between px-5 py-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => { document.activeElement?.blur() }}>
                                Rechazar
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => { document.activeElement?.blur() }}>
                                Aprobar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}