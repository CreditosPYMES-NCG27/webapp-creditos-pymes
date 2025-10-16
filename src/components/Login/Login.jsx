import "./Login.css";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonActions } from "../Button/ButtonActions";
import { useNotifications } from "../../hooks/useNotifications";

const Login = ({ isPartner = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const notifications = useNotifications();

    const handleLogin = () => {
        ButtonActions.login(navigate, email, password, isPartner, notifications);
    };

    return (
        <div className="login-card shadow p-4 rounded bg-white">
            <div className="text-center mb-4">
                <div className="user-icon mx-auto mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="user-svg"
                    >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                </div>
                <h4 className="mt-2">Iniciar Sesión</h4>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Usuario</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 text-center">
                    <a href="#" className="forgot-link small">¿Olvidó su contraseña?</a>
                </div>

                <Button
                    text="Iniciar Sesión"
                    color="teal"
                    size="md"
                    className="w-100 mb-1"
                    action={handleLogin}  
                />
                {!isPartner && (
                    <Button
                        text="Crear una cuenta"
                        color="default"
                        size="md"
                        className="w-100"
                        action="register"  
                    />
                )}
            </form>
        </div>
    );
};

export default Login;
