

export const UserDetails = () => {

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