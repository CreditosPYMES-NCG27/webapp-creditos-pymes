import { useState } from "react";
import "./ProfileClient.css";

export const UserDetails = (props) => {

    const [userData, setUserData] = useState({
        id: props.id || "",
        email: props.email || "",
        first_name: props.name || "",
        last_name: props.lastname || "",
        role: props.role || "",
        password: "",
        updated_at: props.updated_at || ""
    })

    const [repeatPassword, setRepeatPassword] = useState("")

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
                const dataToSend = { ...userData };

                //If password field is blank will not send it
                if (!dataToSend.password.trim()) {
                    delete dataToSend.password;
                }
                const data = "need to add API service"

                if (data.success) {
                    setRepeatPassword("");
                } else {
                    window.alert(data.error || "Perfil no actualizado, intente nuevamente.");
                }
            } else {
                window.alert("Contraseñas no son iguales. Intente nuevamente.");
            }

        } catch (error) {
            window.alert("Error al actulizar, por favor intente nuevamente.");
        }
    }

    return (
        <div className="container">
            <h2 className="py-4 text-center profile_form_title">Información Usuario</h2>
            <form className="p-5 border border-2 mx-auto rounded client_profile_form">
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
                    className="rounded-2 border-0 p-2 w-75 d-flex mx-auto justify-content-center profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}