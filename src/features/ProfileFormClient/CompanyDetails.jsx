
import { useEffect, useState } from "react";

// CSS files
import "./ProfileClient.css";

// other services
import companyServices from "../../services/companyServices.js";

export const CompanyDetails = () => {

    const [loading, setLoading] = useState(true);
    const [formCompany, setFormCompany] = useState(
        {
            id: "",
            user_id: "",
            legal_name: "",
            tax_id: "",
            contact_email: "",
            contact_phone: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip_code: "",
                country: ""
            },
            created_at: "",
            updated_at: ""
        }
    );

    const handleChange = e => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setFormCompany({
                ...formCompany,
                address: {
                    ...formCompany.address,
                    [key]: value
                }
            });
        } else {
            setFormCompany({
                ...formCompany,
                [name]: value
            });
        }
    }

    const getCompanyDetails = async () => {
        const data = await companyServices.getMyCompanyDetails();
        if (data) {
            setFormCompany(data);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formCompany.contact_email.trim()) {

                // Solo enviamos email/phone, address se mantiene igual
                const dataToSend = {
                    contact_email: formCompany.contact_email,
                    contact_phone: formCompany.contact_phone,
                    address: { ...formCompany.address } // dirección tal como está
                };

                const updatedCompany = await companyServices.updateCompanyContact(dataToSend);

                if (updatedCompany) {
                    setFormCompany(prev => ({
                        ...prev,
                        contact_email: updatedCompany.contact_email,
                        contact_phone: updatedCompany.contact_phone
                        // address no se toca
                    }));
                    window.alert("Datos de contacto de empresa actualizado.");
                } else {
                    window.alert("No se pudo actualizar la empresa.");
                }
            }

        } catch (error) {
            window.alert("Ocurrió un error inesperado. Inténtalo de nuevo.");
            console.error(error);
        } finally {
            // Quitar el focus del botón
            e.target.querySelector("button[type='submit']").blur();
        }
    };

    useEffect(() => {
        getCompanyDetails();
    }, [])

    if (loading) return <p className="text-center mt-5 fs-5">Cargando datos...</p>;

    return (
        <div className="container">
            <h2 className="py-4 text-center profile_form_title">Información Empresa</h2>
            <form
                className="p-5 border border-2 mx-auto rounded client_profile_form"
                onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="companyName" className="form-label">
                        Nombre de la empresa
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="companyName"
                        name="legal_name"
                        value={formCompany.legal_name}
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
                        name="tax_id"
                        value={formCompany.tax_id}
                        aria-label="Disabled input companyIdNumber"
                        disabled />
                </div>

                <div className="mb-4 m-0 p-0">
                    <label htmlFor="companyPhoneNumber" className="form-label">
                        Teléfono de la empresa
                    </label>
                    <input
                        className="form-control"
                        type="tel"
                        id="companyPhoneNumber"
                        name="contact_phone"
                        value={formCompany.contact_phone || ""}
                        aria-label="companyPhoneNumber"
                        onChange={handleChange} />
                </div>

                <div className="mb-4 m-0 p-0">
                    <label htmlFor="companyEmail" className="form-label">
                        Email de la empresa
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="companyEmail"
                        name="contact_email"
                        value={formCompany.contact_email || ""}
                        aria-label="companyEmail"
                        onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label htmlFor="companyAddress" className="form-label">
                        Dirección de la empresa
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="companyAddress"
                        name="address"
                        value={`${formCompany.address.street}, ${formCompany.address.city}, ${formCompany.address.state}, ${formCompany.address.zip_code}, ${formCompany.address.country}`}
                        aria-label="Disabled input companyAddress"
                        disabled />
                </div>

                <button type="submit"
                    className="rounded-2 p-2 w-75 d-flex mx-auto justify-content-center border-0 profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}