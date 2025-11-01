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

                //Hace copia de los datos del formulario
                const dataToSend = { ...userData };

                //Si no hay password no se envia
                if (!dataToSend.password.trim()) {
                    delete dataToSend.password;
                }
                const data = "need to add API service"

                if (data.ok) {
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
            <form 
            className="p-5 border border-2 mx-auto rounded client_profile_form"
            onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user_name" className="form-label">
                        Nombre
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="user_name"
                        value={userData.first_name}
                        placeholder="Nombre"
                        aria-label="user_name" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="user_lastname" className="form-label">
                        Apellidos
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="user_lastname"
                        value={userData.last_name}
                        placeholder="Apellidos"
                        aria-label="user_lastname" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-4 m-0 p-0">
                    <label htmlFor="user_email" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="user_email"
                        value={userData.email}
                        placeholder="usuario1@example.com"
                        aria-label="user_email" 
                        onChange={handleChange}/>
                </div>

                <div className="mb-3 m-0 p-0">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input 
                    type="password" 
                    name="password"
                    value={userData.password}
                    className="form-control" 
                    id="user_password" 
                    onChange={handleChange}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="repeatPassword1" className="form-label">
                        Confirmar contraseña
                    </label>
                    <input 
                    type="password" 
                    value={repeatPassword}
                    className="form-control" 
                    id="user_repeatPassword" 
                    onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>

                <button type="submit"
                    className="rounded-2 border-0 p-2 w-75 d-flex mx-auto justify-content-center profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}