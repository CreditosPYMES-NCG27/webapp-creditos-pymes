
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
  }
};