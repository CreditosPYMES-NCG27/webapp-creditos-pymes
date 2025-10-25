import { useState } from "react";
import "./ProfileClient.css";

export const UserDetails = (props) => {

    const [userData, setUserData] = useState({
        id: props.id || "",
        email: props.email || "",
        first_name: props.name || "",
        last_name: props.lastname || "",
        contact_phone:"",
        contact_email:"",
        role: props.role || "",
        updated_at: props.updated_at || ""
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userData.password === repeatPassword) {

                //Makes copy of the formData
                const dataToSend = { ...formData };

                //If password field is blank will not send it
                if (!dataToSend.password.trim()) {
                    delete dataToSend.password;
                }
                const data = await userServices.editUser(dataToSend);

                if (data.success) {
                    dispatch({ type: "edit_profile", payload: data.user });
                    showSuccess("Your profile has been updated.")
                    setRepeatPassword("");
                } else {
                    showError(data.error || "Could not update profile, try again.");
                }
            } else {
                showError("Passwords do not match. Please try again.");
            }

        } catch (error) {
            showError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <div className="container">
            <h2 className="py-4 text-center profile_form_title">Información Usuario</h2>
            <form 
            className="p-5 border border-2 mx-auto rounded client_profile_form"
            onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        value={userData.first_name}
                        placeholder="Nombre"
                        aria-label="user name" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="lastname" className="form-label">
                        Apellidos
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="lastname"
                        value={userData.last_name}
                        placeholder="Apellidos"
                        aria-label="user lastname" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="userPhoneNumber" className="form-label">
                        Teléfono contacto (opcional)
                    </label>
                    <input
                        className="form-control"
                        type="tel"
                        id="userPhoneNumber"
                        value={userData.contact_phone}
                        placeholder="+34 123 456 789"
                        aria-label="userPhoneNumber" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="userEmail" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="userEmail"
                        value={userData.email}
                        placeholder="usuario1@example.com"
                        aria-label="userEmail" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-5">
                    <label htmlFor="repeatPassword1" className="form-label">
                        Confirmar contraseña
                    </label>
                    <input type="password" className="form-control" id="repeatPassword" />
                </div>

                <button type="submit"
                    className="btn p-2 w-75 d-flex mx-auto justify-content-center profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}