import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export const TableRenderers = {
  estado: (value) => {
    const getEstadoClass = (estado) => {
      switch (estado) {
        case 'Pendiente':
          return 'badge-pendiente';
        case 'Aprobado':
          return 'badge-aprobado';
        case 'Rechazado':
          return 'badge-rechazado';
        default:
          return 'bg-secondary';
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
    return `${value}$`;
  },

  acciones: (value, item) => {
    return (
      <button
        className="btn btn-sm btn-outline-secondary"
        title="Ver más opciones"
        onClick={() => console.log('Acción para:', item)}
      >
        ☰
      </button>
    );
  },

  texto: (value) => {
    return value;
  },

  numero: (value) => {
    return value;
  },

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
