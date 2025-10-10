import './UserDashboard.css';

export default function UserDashboard() {
  // Datos hardcodeados - En el futuro vendrán de una API
  const solicitudes = [
    {
      id: '1234456',
      monto: '10.000',
      estado: 'Pendiente',
      fecha: '01/09/25'
    },
    {
      id: '1234457',
      monto: '15.500',
      estado: 'Aprobado',
      fecha: '15/08/25'
    },
    {
      id: '1234458',
      monto: '8.000',
      estado: 'Rechazado',
      fecha: '20/07/25'
    },
    {
      id: '1234459',
      monto: '12.300',
      estado: 'Pendiente',
      fecha: '05/09/25'
    }
  ];

  // Función para obtener la clase de badge según el estado
  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-warning text-dark';
      case 'Aprobado':
        return 'bg-success';
      case 'Rechazado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container my-5">
      <div className="dashboard-header mb-4">
        <h2 className="text-primary">Mis Solicitudes</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID Solicitud</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha</th>
                  <th scope="col" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td className="fw-semibold">## {solicitud.id}</td>
                    <td>{solicitud.monto}$</td>
                    <td>
                      <span className={`badge ${getEstadoBadgeClass(solicitud.estado)}`}>
                        {solicitud.estado}
                      </span>
                    </td>
                    <td>{solicitud.fecha}</td>
                    <td className="text-center">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        title="Ver más opciones"
                      >
                        <i className="bi bi-three-dots"></i>
                        ☰
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}