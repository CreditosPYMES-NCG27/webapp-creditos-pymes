import { useState } from "react";

import "./NewLoanBtn.css";

export const NewLoanBtn = () => {

    const loanReason = [
        { value: 1, label: "Capital de trabajo" },
        { value: 2, label: "Compra de maquinaria/equipos" },
        { value: 3, label: "Expansión o apertura de nueva sede" },
        { value: 4, label: "Marketing y publicidad" },
        { value: 5, label: "Pago de deudas o refinanciamiento" },
        { value: 6, label: "Tecnología / Software" },
        { value: 7, label: "Otras necesidades operativas" }
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

    const closeModal = () => {
        // Forzar blur del elemento enfocado
        document.activeElement?.blur();

        const modalEl = document.getElementById("newLoanModal");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
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

                            <form>
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
                                        type="email"
                                        id="companyAddress"
                                        placeholder="C/ Falsa 124, 28080 Madrid"
                                        aria-label="Disabled input companyAddress"
                                        disabled />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="companyAddress2" className="form-label">
                                        Dirección de la empresa 2 (opcional)
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="companyAddress2"
                                        placeholder="e.g. Piso 3, Puerta B"
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
                                            type="text"
                                            id="loanAmount"
                                            className="form-control rounded-end"
                                            placeholder="0.00"
                                            min={minAmount}
                                            max={maxAmount}
                                            step="100"
                                            aria-label="Currency amount (with dot and two decimal places)"
                                            required
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

                                        <div className="invalid-feedback">
                                            Por favor ingrese una cantidad entre {minAmount} y {maxAmount}. Debe contener solo números y dos decimales.
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-5">
                                    <label htmlFor="loanReason" className="form-label">
                                        Finalidad del préstamo
                                    </label>
                                    <select
                                        id="loanReason"
                                        className="form-select form-select-md"
                                        aria-label=".form-select-sm loanReason"
                                        defaultValue="1"
                                        required>
                                        {loanReason.map((reason) => (
                                            <option key={reason.value} value={reason.value}>
                                                {reason.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="financeStatement" className="form-label">
                                        Estados financieros recientes
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="financeStatement"
                                        name="estadosFinancieros"
                                        required
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
                                        required
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

                            </form>

                        </div>
                        <div className="modal-footer flex-column border-0">
                            <button
                                type="button"
                                className="btn saveBtn_modal mx-auto"
                                onClick={() => { document.activeElement?.blur() }}
                            >
                                Guardar
                            </button>
                            <div className="d-flex justify-content-between w-100 mb-4">
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

                    </div>
                </div>
            </div>
        </>
    );
}