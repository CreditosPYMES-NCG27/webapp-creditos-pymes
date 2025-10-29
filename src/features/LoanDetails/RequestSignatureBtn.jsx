import { useState } from "react";
import { supabase } from "../../auth/supabaseClient.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//services
import helloSignServices from "../../services/helloSignServices.js";

export const RequestSignatureBtn = ({ client, loan_id }) => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [title, setTitle] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        // Forzar blur del elemento enfocado
        document.activeElement?.blur();

        const modalEl = document.getElementById("requestSignature");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const getDocumentSignedUrl = async (path) => {
        const { data, error } = await supabase
            .storage
            .from('documents')
            .createSignedUrl(path, 60);

        if (error) {
            console.error("Supabase error:", error);
            // evita que falle al acceder a signedUrl
            return null;
        }

        if (!data || !data.signedUrl) {
            console.warn("No se pudo generar signedUrl para:", path);
            return null;
        }

        return data.signedUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!file) {
                alert("Debe adjuntar un archivo PDF para firmar.");
                return;
            }

            if (!documentType) {
                alert("Debe seleccionar un tipo de documento.");
                return;
            }

            const token = localStorage.getItem("sb-token");
            if (!token) throw new Error("Usuario no autenticado");

            // 1️⃣ Upload file to private/tmp/ folder
            const safeTitle = title.replace(/[^a-z0-9_-]/gi, "_");
            const tempPath = `private/tmp/${Date.now()}_${safeTitle}`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from("documents")
                .upload(tempPath, file, { contentType: "application/pdf", upsert: true });

            if (uploadError) throw new Error("Error al subir el archivo temporal: " + uploadError.message);

            // 2️⃣ Generate temporary signed URL for HelloSign
            const { data: signedUrlData, error: signedUrlError } = await supabase
                .storage
                .from("documents")
                .createSignedUrl(tempPath, 60); // valid 60 seconds

            if (signedUrlError || !signedUrlData?.signedUrl) {
                throw new Error("No se pudo generar signed URL temporal");
            }

            const signedUrl = signedUrlData.signedUrl;

            // 3️⃣ Create a temporary document record in backend
            const docResponse = await fetch(`${BACKEND_URL}/api/v1/documents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    documentType,
                    filePath: tempPath,
                    fileUrl: signedUrl,
                    userId: client.id, // optional
                }),
            });

            const docData = await docResponse.json();
            if (!docResponse.ok) throw new Error(JSON.stringify(docData));

            const documentId = docData.document_id; // valid ID for API

            // 4️⃣ Request HelloSign signature
            const result = await helloSignServices.requestSignature({
                signerEmail: client.email,
                signerName: client.name,
                documentId,
                callbackUrl: `${BACKEND_URL}/webhooks/hellosign`,
            });

            console.log("HelloSign result:", result);
            window.alert("✅ Solicitud de firma enviada correctamente. Se guardará cuando se firme.");
            closeModal();

        } catch (err) {
            console.error("Error en el proceso de firma:", err);
            alert(err.message || "Error al solicitar la firma");
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    if (loading) return <p className="text-center mt-5 fs-5">Cargando...</p>;

    return (
        <>
            <button
                type="button"
                className="btn request_signature_btn rounded-pill py-0 px-3"
                data-bs-toggle="modal"
                data-bs-target="#requestSignature"
            >
                Solicitar Firma
            </button>

            <div
                className="modal fade"
                id="requestSignature"
                tabIndex="-1"
                aria-labelledby="requestSignatureLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="requestSignatureLabel">
                                Solicitar Firma
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="documentTitle" className="form-label">
                                        Título del documento:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="documentTitle"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="documentType" className="form-label">
                                        Tipo de documento:
                                    </label>
                                    <select
                                        id="documentType"
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Seleccionar tipo de documento</option>
                                        <option value="tax_return">Declaración de impuestos</option>
                                        <option value="financial_statement">Estado financiero</option>
                                        <option value="id_document">Documento de identidad</option>
                                        <option value="business_license">Licencia comercial</option>
                                        <option value="bank_statement">Extracto bancario</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fileUrl" className="form-label">
                                        URL del documento (opcional si sube archivo):
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fileUrl"
                                        placeholder="https://..."
                                        value={fileUrl}
                                        onChange={(e) => setFileUrl(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="attachDocument" className="form-label">
                                        Adjuntar documento a firmar:
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="attachDocument"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        accept="application/pdf"
                                    />
                                </div>

                                <div className="d-flex justify-content-around pt-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger w-25 p-2"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn submit_send_btn p-2 w-25"
                                        disabled={loading}
                                    >
                                        {loading ? "Enviando..." : "Solicitar"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
