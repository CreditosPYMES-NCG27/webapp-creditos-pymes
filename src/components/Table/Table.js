// Funciones helper para renderizar diferentes tipos de celdas

export const TableRenderers = {
  // Renderiza un badge de estado con colores dinámicos
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

  // Renderiza un ID con el prefijo ##
  idSolicitud: (value) => {
    return <span className="fw-semibold">## {value}</span>;
  },

  // Renderiza un monto con formato de moneda
  monto: (value) => {
    return `${value}$`;
  },

  // Renderiza un botón de acciones
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

  // Renderiza texto normal
  texto: (value) => {
    return value;
  },

  // Renderiza un número
  numero: (value) => {
    return value;
  }
};