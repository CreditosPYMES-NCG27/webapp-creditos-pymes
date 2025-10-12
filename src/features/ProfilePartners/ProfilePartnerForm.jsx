import "./PartnerProfile.css";

export const ProfilePartnerForm = () =>{
    
    return(
        <div className="container">
            <form className="p-5 border border-2 mx-auto rounded client_profile_form">

                <img
                    src="https://randomuser.me/api/portraits/lego/4.jpg"
                    alt="user"
                    className="user_img mb-3 border border-2 mx-auto"
                    style={{ cursor: 'pointer' }}
                />

                <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                        ID Usuario
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        aria-label="user name" />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        aria-label="user name" />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastname" className="form-label">
                        Apellidos
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="lastname"
                        placeholder="Apellidos"
                        aria-label="user lastname" />
                </div>

                <div className="mb-4">
                    <label htmlFor="userPhoneNumber" className="form-label">
                        Teléfono contacto (opcional)
                    </label>
                    <input
                        className="form-control"
                        type="tel"
                        id="userPhoneNumber"
                        placeholder="+34 123 456 789"
                        aria-label="userPhoneNumber" />
                </div>

                <div className="mb-4">
                    <label htmlFor="userEmail" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="userEmail"
                        placeholder="usuario1@example.com"
                        aria-label="userEmail" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">
                        Contraseña
                    </label>
                    <input type="password" className="form-control" id="password1" />
                </div>
                <div className="mb-5">
                    <label htmlFor="repeatPassword1" className="form-label">
                        Confirmar contraseña
                    </label>
                    <input type="password" className="form-control" id="repeatPassword1" />
                </div>

                <button type="submit"
                    className="btn p-2 w-75 d-flex mx-auto justify-content-center profile_form_submit_btn">
                    Guardar
                </button>
            </form>
        </div>
    );
}