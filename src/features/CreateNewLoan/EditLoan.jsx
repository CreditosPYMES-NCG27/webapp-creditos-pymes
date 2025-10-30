import { useState, useEffect } from "react";
import { getLoanById, updateLoanDraft, updateLoanStatus } from "../../services/creditService";
import documentServices, { DocumentTypes } from "../../services/documentServices";

export const EditLoanModal = ({ loanId, company, onSuccess }) => {
    const [newLoanForm, setNewLoanForm] = useState({
        requested_amount: "",
        term_months: "",
        purpose: "",
        purpose_other: ""
    });
    const [errors, setErrors] = useState({});
    const [existingFiles, setExistingFiles] = useState({});
    const [isEditable, setIsEditable] = useState(true);

    const minMonths = 1, maxMonths = 360;
    const minAmount = 1000, maxAmount = 250000;
    const currencyOptions = "EUR";

    const loanReason = [
        { label: "Elige una opción", value: "" },
        { label: "Capital de trabajo", value: "working_capital" },
        { label: "Equipos", value: "equipment" },
        { label: "Expansión", value: "expansion" },
        { label: "Inventario", value: "inventory" },
        { label: "Refinanciamiento", value: "refinancing" },
        { label: "Otro", value: "other" },
    ];

    console.log(loanId);


    useEffect(() => {
        const fetchLoan = async () => {
            if (!loanId) return;
            const loanData = await getLoanById(loanId);
            if (!loanData) return;

            setNewLoanForm({
                requested_amount: loanData.requested_amount,
                term_months: loanData.term_months,
                purpose: loanData.purpose,
                purpose_other: loanData.purpose_other || ""
            });
            setIsEditable(loanData.status === "draft");

            if (loanData.status === "draft") {

                console.log(loanId);

                const docsResponse = await documentServices.getDocuments({ application_id: loanData.id });
                console.log(docsResponse);

                const docs = docsResponse?.items || [];
                const grouped = {};
                docs.forEach(f => {
                    if (!grouped[f.document_type]) grouped[f.document_type] = [];
                    grouped[f.document_type].push(f);
                });

                console.log(grouped);

                setExistingFiles(grouped);
            }
        };
        fetchLoan();
    }, [loanId]);

    const handleLoanForm = (e) => {
        const { name, value } = e.target;
        setNewLoanForm({
            ...newLoanForm,
            [name]: (name === "requested_amount" || name === "term_months") ? Number(value) : value
        });
    };

    const truncateName = (name, maxLength = 20) => {
        if (!name) return "";
        return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newLoanForm.requested_amount || newLoanForm.requested_amount <= 0)
            newErrors.requested_amount = "Ingrese un monto válido mayor que 0";
        if (!newLoanForm.term_months || newLoanForm.term_months < 1)
            newErrors.term_months = "Ingrese un plazo mínimo de 1 mes";
        if (!newLoanForm.purpose) newErrors.purpose = "Seleccione la finalidad del préstamo";
        if (newLoanForm.purpose === "other" && !newLoanForm.purpose_other.trim())
            newErrors.purpose_other = "Debe especificar el propósito si eligió 'Otro'";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDraft = async (e) => {
        e.preventDefault();

        try {
            if (!validateForm()) return;

            console.log(loanId);

            // Update the loan draft without changing status
            await updateLoanDraft(loanId, {
                requested_amount: newLoanForm.requested_amount,
                term_months: newLoanForm.term_months,
                purpose: newLoanForm.purpose,
                purpose_other: newLoanForm.purpose_other || ""
            });

            // Upload any new documents
            const filesToUpload = {
                [DocumentTypes.FINANCIAL_STATEMENT]: document.getElementById("financeStatement")?.files,
                [DocumentTypes.BANK_STATEMENT]: document.getElementById("bankStatements")?.files,
                [DocumentTypes.OTHER]: document.getElementById("accountingReports")?.files,
            };

            for (const [docType, files] of Object.entries(filesToUpload)) {
                if (files && files.length > 0) {
                    for (const file of files) {
                        await documentServices.uploadLoanDocument(loanId, docType, file);
                    }
                }
            }

            if (onSuccess) onSuccess();
            window.alert("Borrador del préstamo guardado correctamente");
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileDelete = async (docType, fileId) => {
        await documentServices.deleteLoanDocument(fileId);
        setExistingFiles(prev => ({
            ...prev,
            [docType]: prev[docType].filter(f => f.id !== fileId)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || !isEditable) return;
        await updateLoanStatus(loanId, "pending", newLoanForm);

        const filesToUpload = {
            [DocumentTypes.FINANCIAL_STATEMENT]: document.getElementById("financeStatement")?.files,
            [DocumentTypes.BANK_STATEMENT]: document.getElementById("bankStatements")?.files,
            [DocumentTypes.OTHER]: document.getElementById("accountingReports")?.files,
        };

        for (const [docType, files] of Object.entries(filesToUpload)) {
            if (files && files.length > 0) {
                for (const file of files) {
                    await documentServices.uploadLoanDocument(loanId, docType, file);
                }
            }
        }

        onSuccess?.();
    };

    return (
        <>

            <div className="modal fade" id={`editLoanModal-${loanId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`editLoanModal-${loanId}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title m-2 mx-auto" id={`editLoanModal-${loanId}Label`}>Editar Solicitud</h5>
                            <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 text-start">
                            <form onSubmit={handleSubmit}>
                                {/* Empresa */}
                                <div className="mb-4">
                                    <label className="form-label">Nombre de la empresa</label>
                                    <input className="form-control" type="text" value={company.legal_name || ""} disabled />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Identificador fiscal de la empresa</label>
                                    <input className="form-control" type="text" value={company.tax_id || ""} disabled />
                                </div>
                                <div className="mb-4 m-0">
                                    <label className="form-label">Teléfono de la empresa</label>
                                    <input className="form-control w-100" type="tel" value={company.contact_phone || ""} disabled />
                                </div>
                                <div className="mb-4 m-0">
                                    <label className="form-label">Email de la empresa</label>
                                    <input className="form-control" type="email" value={company.contact_email || ""} disabled />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Dirección de la empresa</label>
                                    <input className="form-control" type="text"
                                        value={`${company?.address?.street || ""}, ${company?.address?.city || ""}, ${company?.address?.state || ""}, ${company?.address?.zip_code || ""}, ${company?.address?.country || ""}`}
                                        disabled
                                    />
                                </div>

                                {/* Loan */}
                                <div className="mb-3 mt-5">
                                    <label className="form-label mb-0">Monto a solicitar</label>
                                    <div className="form-text mb-2">Debe estar entre {minAmount} y {maxAmount}.</div>
                                    <div className="input-group mb-3">
                                        <input type="number" name="requested_amount" value={newLoanForm.requested_amount} className={`form-control ${errors.requested_amount ? "is-invalid" : ""}`} min={minAmount} max={maxAmount} step="100" required onChange={handleLoanForm} disabled={!isEditable} />
                                        <span className="input-group-text">{currencyOptions}</span>
                                        <div className="invalid-feedback">{errors.requested_amount}</div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Plazo de pago:</label>
                                    <div className="form-text mb-2">Debe introducir solo números, sin letras.</div>
                                    <div className="input-group">
                                        <input type="number" name="term_months" value={newLoanForm.term_months} className={`form-control ${errors.term_months ? "is-invalid" : ""}`} min={minMonths} max={maxMonths} required onChange={handleLoanForm} disabled={!isEditable} />
                                        <span className="input-group-text">{newLoanForm.term_months <= 1 ? "Mes" : "Meses"}</span>
                                        <div className="invalid-feedback">{errors.term_months}</div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="form-label">Finalidad del préstamo</label>
                                    <select name="purpose" value={newLoanForm.purpose} className={`form-select w-75 ${errors.purpose ? "is-invalid" : ""}`} required onChange={handleLoanForm} disabled={!isEditable}>
                                        {loanReason.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                                    </select>
                                    <div className="invalid-feedback">{errors.purpose}</div>
                                </div>

                                {newLoanForm.purpose === "other" && (
                                    <div className="mb-3">
                                        <label>Indique la razón del préstamo:</label>
                                        <input type="text" name="purpose_other" value={newLoanForm.purpose_other} onChange={handleLoanForm} className={`form-control ${errors.purpose_other ? "is-invalid" : ""}`} required disabled={!isEditable} />
                                        <div className="invalid-feedback">{errors.purpose_other}</div>
                                    </div>
                                )}

                                {/* Files */}
                                {[DocumentTypes.FINANCIAL_STATEMENT, DocumentTypes.BANK_STATEMENT, DocumentTypes.OTHER].map((docType) => (
                                    <div className="mb-3" key={docType}>
                                        <label className="form-label mb-2">
                                            {docType === DocumentTypes.FINANCIAL_STATEMENT && "Estados financieros recientes"}
                                            {docType === DocumentTypes.BANK_STATEMENT && "Extractos bancarios"}
                                            {docType === DocumentTypes.OTHER && "Informes contables (opcional)"}
                                        </label>

                                        {existingFiles[docType]?.length > 0 ? (
                                            existingFiles[docType].map(file => (
                                                <div key={file.id} className="d-flex align-items-center justify-content-between mt-1 text-info">
                                                    <span className="ms-3 w-75">{truncateName(file.file_name)}</span>
                                                    {isEditable && (
                                                        <button
                                                            type="button"
                                                            className="btn-close btn-close-sm w-25"
                                                            aria-label="Close"
                                                            onClick={() => handleFileDelete(docType, file.id)}
                                                        ></button>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <input
                                                type="file"
                                                className="form-control"
                                                id={
                                                    docType === DocumentTypes.FINANCIAL_STATEMENT
                                                        ? "financeStatement"
                                                        : docType === DocumentTypes.BANK_STATEMENT
                                                            ? "bankStatements"
                                                            : "accountingReports"
                                                }
                                                disabled={!isEditable}
                                                {...(docType !== DocumentTypes.OTHER && { required: true })}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="modal-footer flex-column border-0">
                                    <button type="submit" className="btn saveBtn_modal mx-auto" onClick={updateLoanDraft} disabled={!isEditable}>Guardar</button>
                                    <div className="d-flex justify-content-between w-100">
                                        <button type="button" className="btn cancelBtn_modal p-2 m-4" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn submitBtn_modal p-2 m-4" onClick={handleSubmit} disabled={!isEditable}>Enviar Solicitud</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
