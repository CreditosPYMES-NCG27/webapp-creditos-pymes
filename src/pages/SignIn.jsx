import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../features/SignIn/SignIn.css";

const SignInPage = () => {
    const [showSecondForm, setShowSecondForm] = useState(false);

    const handleSiguiente = (e) => {
        e.preventDefault();
        setShowSecondForm(true);
    };
    return(
        <div className="container-fluid">
            <section>
                <div>
                    <img 
                        src="/src/assets/images/bg-login.webp"
                        alt="Imagen Empresa"
                    />
                </div>
                <div className="mx-auto">
                    {/*íconos del form*/}
                    <div className="mt-5 mx-auto">
                        <img
                            src="/casa.svg"
                            alt="Casa Usuario"
                        />
                        <img className="ms-5"
                            src="/user.svg"
                            alt="Casa Usuario"
                        />
                    </div>
                    {/*form */}
                    <div className="w-80 border border-rounded mt-3" style={{ minWidth: "340px" }}>
                       <form className="p-4 border border-1">
                        {!showSecondForm ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Nombre de la Empresa</label>
                                    <input type="text" className="form-control" id="" required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Identificador Fiscal de la Empresa</label>
                                    <input type="text" className="form-control" id="" required/>
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Teléfono de la Empresa</label>
                                    <input type="text" className="form-control" id="" required/>
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Dirección de la Empresa</label>
                                    <input type="text" className="form-control" id="" required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Dirección de la Empresa 2(Opcional)</label>
                                    <input type="text" className="form-control" id=""/>
                                </div>
                                <button type="submit" className="btn color-btn w-100" onClick={handleSiguiente}>Siguiente</button>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" required />
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirmar Contraseña</label>
                                    <input type="password" className="form-control" required />
                                </div>
                                <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="checkDefault" required/>
                                <label className="form-check-label" for="checkDefault">
                                    Acepto los{" "} 
                                    <a href="" className="terminosycondiciones">
                                    términos y condiciones
                                    </a>
                                </label>
                                </div>
                                <button type="submit" className="btn color-btn w-100">Registrarse</button>
                            </>
                        )}
                    </form> 
                    </div>
                </div>
            </section>
        </div>
    );
};
export default SignInPage