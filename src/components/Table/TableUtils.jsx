import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css"; // estilos del dropdown

export const TableRenderers = {
  estado: (value) => {
    const getEstadoClass = (estado) => {
      switch (estado) {
        case "Pendiente":
          return "badge-pendiente";
        case "Aprobado":
          return "badge-aprobado";
        case "Rechazado":
          return "badge-rechazado";
        default:
          return "bg-secondary";
      }
    };

    return (
      <span className={`badge badge-estado ${getEstadoClass(value)}`}>
        {value}
      </span>
    );
  },

  idSolicitud: (value) => {
    return <span className="fw-semibold">## {value}</span>;
  },

  monto: (value) => {
    return ` $${value}`;
  },

  acciones: (value, item) => {
    return (
      <div className="dropdown text-center acciones-dropdown">
        <button
          className="btn btn-sm btn-outline-secondary dropdown-toggle border-0 shadow-none accion-btn"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ☰
        </button>

        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
          <li>
            <button className="dropdown-item" onClick={() => handleDescargar(item)}>
              Descargar justificante
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleEditar(item)}>
              Editar solicitud
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleCancelar(item)}>
              Cancelar solicitud
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={() => handleBorrar(item)}
            >
              Borrar solicitud
            </button>
          </li>
        </ul>
      </div>
    );
  },

  texto: (value) => value,

  numero: (value) => value,

  verificacion: (value, item) => {
    const estado = item.status;

    const getEstadoIcon = (estado) => {
      switch (estado) {
        case "Aprobado":
          return (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-success me-2"
              title="Aprobado"
            />
          );
        case "Rechazado":
          return (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-danger me-2"
              title="Rechazado"
            />
          );
        default:
          return (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-warning me-2"
              title="Pendiente"
            />
          );
      }
    };

    return (
      <div className="d-flex align-items-center justify-content-center gap-2">
        {getEstadoIcon(estado)}
        <FontAwesomeIcon
          icon={faEye}
          className="text-dark cursor-pointer"
          title="Marcar como revisado"
          onClick={() => console.log("👁️ Revisado:", item.id)}
        />
      </div>
    );
  },
};

// --- Funciones de acción (puedes reemplazar con las reales) ---
const handleDescargar = (item) => {
  console.log("📄 Descargar justificante de:", item.id);
};

const handleEditar = (item) => {
  console.log("✏️ Editar solicitud:", item.id);
};

const handleCancelar = (item) => {
  console.log("⚠️ Cancelar solicitud:", item.id);
};

const handleBorrar = (item) => {
  console.log("🗑️ Borrar solicitud:", item.id);
};
