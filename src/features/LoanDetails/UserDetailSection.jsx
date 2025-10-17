//CSS files
import './LoanPage.css';

export const UserDetailSection = () => {

    return (
        <div className="row m-4">
            <div className="col-6 mt-3 lh-sm">
                <h3 className="mb-4 subtitle_loan_details_page">Detalles Empresa:</h3>
                <p className="loan_details_text">Nombre de la empresa:</p>
                <p className="loan_details_text">Número fiscal de la empresa:</p>
                <p className="loan_details_text">Dirección:</p>
                <p className="loan_details_text">Dirección 2 (opcional):</p>
            </div>
            <div className="col-6 d-flex align-self-end">
                <div>
                    <h5>Montón solicitado:</h5>
                    <h5>Finalidad del crédito:</h5>
                </div>
            </div>
            <div className="col-6 mt-4 lh-sm">
                <p className="loan_details_text">Representante:</p>
                <p className="loan_details_text">Teléfono de la empresa:</p>
                <p className="loan_details_text">Email de la empresa:</p>
                <h5 className="my-5">Verificación:</h5>
            </div>
            <div className="col-6 mt-4">
                <h4>Notas internas</h4>
            </div>
        </div>
    );
}