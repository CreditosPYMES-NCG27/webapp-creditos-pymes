import "./Button.css";
import { useNavigate } from "react-router-dom";
import { ButtonActions } from "./ButtonActions";

export default function Button({
  text,                     // 🔹 Texto que se muestra dentro del botón
  color = "primary",        // 🔹 Color / variante: "primary" | "secondary" | "trird" | "accept" | "cancel"
  size = "md",              // 🔹 Tamaño: "sm" | "md" | "lg"
  className = "",           // 🔹 Clases adicionales de Bootstrap o personalizadas
  action = "alert",         // 🔹 Acción a ejecutar al hacer click, definida en ButtonActions
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (action && ButtonActions[action]) {
      ButtonActions[action](navigate);
    }
  };

  return (
    <button
      className={`btn btn-${color} btn-${size} btn-custom ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
