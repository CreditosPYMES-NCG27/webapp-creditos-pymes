import { useState } from "react";
import "../features/SignIn/SignIn.css";
import { supabase } from "../auth/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [showSecondForm, setShowSecondForm] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: "",
        tax_id: "",
        contact_phone: "",
        address1: "",
        address2: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmarPassword: "",
    });
    const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
    };

    const handleSiguiente = (e) => {
        e.preventDefault();
        setShowSecondForm(true);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

        if (formData.password !== formData.confirmarPassword) {
        alert("Las contraseñas no coinciden");
        return;
        }

        try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
            data: {
                company: formData.company,
                tax_id: formData.tax_id,
                contact_phone: formData.contact_phone,
                address1: formData.address1,
                address2: formData.address2,
                first_name: formData.first_name,
                last_name: formData.last_name,
            },
            },
        });

        if (error) {
            console.error(error);
            alert("Error al registrar: " + error.message);
            return;
        }

        alert("Usuario registrado exitosamente.");
        console.log("Usuario registrado:", data);
        setTimeout(() => {
        navigate("/login-users");
        }, 1000)

        } catch (err) {
        console.error("Error inesperado:", err);
        alert("Ocurrió un error al registrar el usuario.");
        }
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
                    <div className="w-80 border rounded mt-3" style={{ minWidth: "340px" }}>
                       <form onSubmit={!showSecondForm ? handleSiguiente : handleSubmit} className="p-4 border-2">
                        {!showSecondForm ? (
                            <>
                                <div class="mb-3">
                                    <label class="form-label">Nombre de la Empresa</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" required/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Identificador Fiscal de la Empresa</label>
                                    <input type="text" name="tax_id" value={formData.tax_id} onChange={handleChange} className="form-control" required/>
                                </div>
                                <div class="mb-3 ms-0">
                                    <label class="form-label">Teléfono de la Empresa</label>
                                    <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} className="form-control" required/>
                                </div>
                                <div class="mb-3 ms-0">
                                    <label class="form-label">Dirección de la Empresa</label>
                                    <input type="text" name="address1" value={formData.address1} onChange={handleChange} className="form-control" required/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Dirección de la Empresa 2(Opcional)</label>
                                    <input type="text" name="address2" value={formData.address2} onChange={handleChange} className="form-control" id=""/>
                                </div>
                                <button type="submit" className="btn color-btn w-100" onClick={handleSiguiente}>Siguiente</button>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 ms-0">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirmar Contraseña</label>
                                    <input type="password" name="confirmarPassword" value={formData.confirmarPassword} onChange={handleChange} className="form-control" required />
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