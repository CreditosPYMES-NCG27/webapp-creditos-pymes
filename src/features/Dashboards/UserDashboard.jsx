import './UserDashboard.css';
import Table from '@/components/Table/Table';
import { TableRenderers } from '@/components/Table/TableUtils';

export default function UserDashboard() {
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

  const columns = [
    {
      key: 'id',
      label: 'ID Solicitud',
      render: TableRenderers.idSolicitud
    },
    {
      key: 'monto',
      label: 'Monto',
      render: TableRenderers.monto
    },
    {
      key: 'estado',
      label: 'Estado',
      render: TableRenderers.estado
    },
    {
      key: 'fecha',
      label: 'Fecha',
      render: TableRenderers.texto
    },
    {
      key: 'acciones',
      label: 'Acciones',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: TableRenderers.acciones
    }
  ];

  return (
    <div className="container my-5">
      <div className="dashboard-header mb-4">
        <h2 className="text-primary">Mis Solicitudes</h2>
      </div>

      <Table columns={columns} data={solicitudes} />
    </div>
  );
}