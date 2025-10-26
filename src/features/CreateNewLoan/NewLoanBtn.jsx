import { useState } from "react";

//CSS files
import "./NewLoanBtn.css";

//services
import { createNewLoan } from "../../services/creditService";

export const NewLoanBtn = () => {

    const [newLoanForm, setNewLoan] = useState({
        requested_amount: "",
        term_months: "",
        purpose: "",
        purpose_other: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newLoanForm.requested_amount || newLoanForm.requested_amount <= 0) {
            newErrors.requested_amount = "Ingrese un monto válido mayor que 0";
        }
        if (!newLoanForm.term_months || newLoanForm.term_months < 1) {
            newErrors.term_months = "Ingrese un plazo mínimo de 1 mes";
        }
        if (!newLoanForm.purpose) {
            newErrors.purpose = "Seleccione la finalidad del préstamo";
        }
        if (newLoanForm.purpose === "other" && !newLoanForm.purpose_other.trim()) {
            newErrors.purpose_other = "Debe especificar el propósito si eligió 'Otro'";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const minMonths = 1;
    const maxMonths = 360;

    const loanReason = [
        {label: "Elige una opción", value: ""},
        { label: "Capital de trabajo", value: "working_capital" },
        { label: "Equipos", value: "equipment" },
        { label: "Expansión", value: "expansion" },
        { label: "Inventario", value: "inventory" },
        { label: "Refinanciamiento", value: "refinancing" },
        { label: "Otro", value: "other" },
    ]

    const [currentCurrency, setCurrentCurrency] = useState("EUR");
    const minAmount = 1000;
    const maxAmount = 250000;

    const currencyOptions = [
        { value: 1, label: "EUR" },
        { value: 2, label: "USD" },
        { value: 3, label: "GBP" },
        { value: 4, label: "JPY" },
        { value: 5, label: "CHF" },
        { value: 6, label: "CAD" },
        { value: 7, label: "AUD" },
        { value: 8, label: "CNY" },
        { value: 9, label: "SEK" },
        { value: 10, label: "NZD" },
        { value: 11, label: "MXN" },
        { value: 12, label: "BRL" },
        { value: 13, label: "ARS" },
        { value: 14, label: "CLP" },
        { value: 15, label: "COP" },
        { value: 16, label: "PEN" }
    ]

    const handleLoanForm = (e) => {
        const { name, value } = e.target;

        setNewLoan({
            ...newLoanForm,
            [name]: (name === "requested_amount" || name === "term_months") ? Number(value) : value,
        });
    };

    const closeModal = () => {
        // Forzar blur del elemento enfocado
        document.activeElement?.blur();

        const modalEl = document.getElementById("newLoanModal");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(newLoanForm);

        const createdLoan = await createNewLoan(newLoanForm);
        if (createdLoan) {
            window.alert("Loan created:", createdLoan);
            closeModal();
            setNewLoan({
                requested_amount: 0,
                term_months: 0,
                purpose: "",
                purpose_other: ""
            })
        } else {
            console.error("Failed to create loan");
        }
    };

    return (
        <>
            {/* Boton modal */}
            <button
                type="button"
                className="btn rounded-pill newLoan_modalBtn p-3 m-4"
                data-bs-toggle="modal"
                data-bs-target="#newLoanModal">
                Nueva Solicitud
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="newLoanModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="newLoanModalLabel"
                aria-hidden="true">

                {/* cuerpo del modal */}
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5
                                className="modal-title m-2 mx-auto newLoan_modal_title"
                                id="newLoanModalLabel">Nueva Solicitud</h5>
                            <button
                                type="button"
                                className="btn-close m-2"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { document.activeElement?.blur() }}></button>
                        </div>
                        <div className="modal-body p-4">

                            <form onSubmit={handleSubmit}>
                                {/* input para datos de empresa no se permiten editar por cuestiones de seguridad y fraude*/}
                                {/*para editar debería de hacerlo en el perfil y a petición del usuario a un operador */}
                                <div className="mb-4">
                                    <label htmlFor="companyName" className="form-label">
                                        Nombre de la empresa
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="companyName"
                                        placeholder="Empresa1"
                                        aria-label="Disabled input companyName"
                                        disabled />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="companyIdNumber" className="form-label">
                                        Identificador fiscal de la empresa
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="companyIdNumber"
                                        placeholder="R1234567"
                                        aria-label="Disabled input companyIdNumber"
                                        disabled />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="companyPhoneNumber" className="form-label">
                                        Teléfono de la empresa
                                    </label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        id="companyPhoneNumber"
                                        placeholder="+34 123 456 789"
                                        aria-label="Disabled input companyPhoneNumber"
                                        disabled />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="companyEmail" className="form-label">
                                        Email de la empresa
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="companyEmail"
                                        placeholder="empresa1@example.com"
                                        aria-label="Disabled input companyEmail"
                                        disabled />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="companyAddress" className="form-label">
                                        Dirección de la empresa
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="companyAddress"
                                        placeholder="C/ Falsa 124, 28080 Madrid"
                                        aria-label="Disabled input companyAddress"
                                        disabled />
                                </div>

                                {/* Detalles del préstamo a soliticitar */}
                                <div className="mb-3 mt-5">
                                    <label htmlFor="loanAmount" className="form-label mb-0">
                                        Monton a solicitar
                                    </label>
                                    <div id="loanAmountHelpInline" className="form-text mb-2">
                                        Debe estar entre {minAmount} y {maxAmount}.
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            id="loanAmount"
                                            name="requested_amount"
                                            value={newLoanForm.requested_amount}
                                            className={`form-control ${errors.requested_amount ? "is-invalid" : ""}`}
                                            placeholder="0.00"
                                            min={minAmount}
                                            max={maxAmount}
                                            step="100"
                                            aria-label="Currency amount (with dot and two decimal places)"
                                            required
                                            onChange={handleLoanForm}
                                        />

                                        <div className="input-group-append dropdown scrollable_dropdown_currency">
                                            <button
                                                className="btn rounded-end ms-1 border-light border-1 dropdown_currency dropdown-toggle input-group-text"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {currentCurrency}
                                            </button>

                                            <ul className="dropdown-menu dropdown_menu_currency">
                                                {currencyOptions.map((currency) => (
                                                    <li key={currency.value}>
                                                        <button
                                                            className="dropdown-item"
                                                            type="button"
                                                            onClick={() => setCurrentCurrency(currency.label)}
                                                        >
                                                            {currency.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                            <input type="hidden" name="currency" value={currentCurrency} />
                                        </div>
                                        <div className="invalid-feedback">{errors.requested_amount}</div>
                                    </div>

                                </div>
                                <div className="mb-4">
                                    <label htmlFor="termMonths" className="form-label">
                                        Plazo de pago:
                                    </label>

                                    <div id="termMonthsHelpInline" className="form-text mb-2">
                                        Debe introducir solo números, sin letras.
                                    </div>

                                    <div class="input-group">
                                        <input
                                            className={`form-control ${errors.term_months ? "is-invalid" : ""}`}
                                            type="number"
                                            min={minMonths}
                                            max={maxMonths}
                                            id="termMonths"
                                            name="term_months"
                                            value={newLoanForm.term_months}
                                            placeholder="Ejemplo: 12"
                                            aria-label=".form-select-sm termMonths"
                                            required
                                            aria-describedby="payment_motnhly"
                                            onChange={handleLoanForm} />
                                        <span class="input-group-text" id="payment_motnhly">Meses</span>
                                    </div>
                                    <div className="invalid-feedback">{errors.term_months}</div>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="loanReason" className="form-label">
                                        Finalidad del préstamo
                                    </label>
                                    <select
                                        id="loanReason"
                                        name="purpose"
                                        value={newLoanForm.purpose}
                                        defaultValue={""}
                                        className={`form-select w-75 ${errors.purpose ? "is-invalid" : ""}`}
                                        aria-label=".form-select-sm loanReason"
                                        required
                                        onChange={handleLoanForm}>
                                        {loanReason.map((reason) => (
                                            <option key={reason.value} value={reason.value}>
                                                {reason.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">{errors.purpose}</div>
                                </div>

                                {newLoanForm.purpose === "other" && (
                                    <div className="mb-3">
                                        <label htmlFor="purpose_other">Indique la razón del préstamo:</label>
                                        <input
                                            type="text"
                                            id="purpose_other"
                                            name="purpose_other"
                                            value={newLoanForm.purpose_other}
                                            onChange={handleLoanForm}
                                            className={`form-control ${errors.purpose_other ? "is-invalid" : ""}`}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.purpose_other}</div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="financeStatement" className="form-label">
                                        Estados financieros recientes
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="financeStatement"
                                        name="estadosFinancieros"

                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="bankStatements" className="form-label">
                                        Extractos bancarios
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="bankStatements"
                                        name="extractosBancarios"

                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="accountingReports" className="form-label">
                                        Informes contables (opcional)
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="accountingReports"
                                        name="informesContables"
                                    />
                                </div>

                                <div className="modal-footer flex-column border-0">
                                    <button
                                        type="button"
                                        className="btn saveBtn_modal mx-auto"
                                        onClick={() => { document.activeElement?.blur() }}
                                    >
                                        Guardar
                                    </button>
                                    <div className="d-flex justify-content-between w-100">
                                        <button type="button"
                                            className="btn cancelBtn_modal p-2 m-4"
                                            data-bs-dismiss="modal"
                                            onClick={() => { document.activeElement?.blur() }}>
                                            Cancelar
                                        </button>
                                        <button type="submit"
                                            className="btn submitBtn_modal p-2 m-4"
                                            onClick={() => { document.activeElement?.blur() }}>
                                            Enviar Solicitud
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}