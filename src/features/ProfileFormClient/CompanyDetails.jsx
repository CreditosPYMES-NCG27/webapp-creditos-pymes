
import "./ProfileClient.css";

export const CompanyDetails = () => {

    return (
        <div className="container">
            <h2 className="py-4 text-center profile_form_title">Información Empresa</h2>
            <form className="p-5 border border-2 mx-auto rounded client_profile_form">
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
                        aria-label="companyPhoneNumber"/>
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
                        aria-label="companyEmail"/>
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

                <div className="mb-5">
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

                <button type="submit" 
                className="btn p-2 w-75 d-flex mx-auto justify-content-center profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}