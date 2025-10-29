import { useState } from "react";
import { supabase } from "../../auth/supabaseClient.js";

//services
import { requestSignature } from "../../services/helloSignServices.js";

export const RequestSignatureBtn = ({ client }) => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let url = fileUrl;

        //Sube el documento a supabase y lo convierte en url
        if (file) {
            const { data, error } = await supabase.storage
                .from("documents")
                .upload(`loan_${Date.now()}_${file.name}`, file);

            if (error) {
                alert("Error al subir archivo: " + error.message);
                setLoading(false);
                return;
            }

            const { publicUrl } = supabase.storage
                .from("documents")
                .getPublicUrl(data.path);

            url = publicUrl;
        }

        if (!url) {
            alert("Por favor proporcione un URL o seleccione un archivo.");
            setLoading(false);
            return;
        }

        //estrutura del email en helloSign
        // se rellena con datos del cliente
        try {
            const response = await helloSignServices.requestSignature({
                signerEmail: client.email,
                signerName: client.name,
                fileUrl: url,
                title,
                comment,
            });

            if(response){
                alert("✅ Solicitud de firma enviada correctamente!");
            }

        } catch (err) {
            console.error(err);
            alert("❌ " + err.message);
        }

        setLoading(false);
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
                                    />
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
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="comment" className="form-label">
                                        Comentarios:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Deje un mensaje al cliente"
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
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
