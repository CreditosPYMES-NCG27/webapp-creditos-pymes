import "./Button.css";

export default function Button({
  text,
  color = "primary", // "primary" | "secondary" | "danger"
  size = "md",          // "sm" | "md" | "lg"
  className = ""
}) {
  return (
    <button 
      className={`btn btn-${color} btn-${size} btn-custom ${className}`}
    >
      {text}
    </button>
  );
}
