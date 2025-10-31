import { useState } from "react";
import { supabase } from "@/auth/supabaseClient";

export const AttachDocumentModal = ({ modalId, loanId }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${documentMeta.application_id}_${documentMeta.document_type}_${Date.now()}.${fileExt}`;
            const filePath = `private/${fileName}`;

            const { data, error } = await supabase.storage
                .from("documents")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: true,
                    metadata: {
                        ...documentMeta,
                        status: "uploaded"
                    },
                });

            if (error) throw error;
            console.log("Documento subido correctamente:", data);

            // Close modal
            const modalEl = document.getElementById(modalId);
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance.hide();

            setFile(null);
        } catch (err) {
            console.error("Error subiendo documento:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id={`${modalId}attachDocument`}
                tabIndex="-1"
                aria-labelledby={`${modalId}attachDocumentLabel`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}attachDocumentLabel`}>Adjuntar Documento</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body p-4">
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        <div className="modal-footer d-flex justify-content-around px-5 py-2">
                            <button
                                type="button"
                                className="btn btn-danger w-25"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-success w-25"
                                onClick={handleUpload}
                                disabled={!file || loading}
                            >
                                {loading ? "Enviando..." : "Enviar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};