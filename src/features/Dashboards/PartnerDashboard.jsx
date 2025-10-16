import './UserDashboard.css';
import { useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';
import { TableRenderers } from '@/components/Table/TableUtils';
import { fetchAllCreditApplications } from '@/services/creditService';

export default function PartnerDashboard() {
  const [searchText, setSearchText] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchAllCreditApplications();
      setSolicitudes(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filtrado adaptado a los nuevos campos
  const filteredData = solicitudes.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.id.toLowerCase().includes(search) ||
      item.applicant_name?.toLowerCase().includes(search) ||
      item.requested_amount?.toString().toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search) ||
      item.created_at?.toLowerCase().includes(search)
    );
  });

  // Columnas para partners
  const columns = [
    {
      key: 'applicant_name',
      label: 'Solicitante',
      render: TableRenderers.texto,
      sortable: true // ⚠️ FALTA 
    },
    {
      key: 'id',
      label: 'Solicitud',
      render: TableRenderers.idSolicitud,
      sortable: false 
    },
    {
      key: 'requested_amount',
      label: 'Monto',
      render: TableRenderers.monto,
      sortable: true 
    },
    {
      key: 'status',
      label: 'Estado',
      render: TableRenderers.estado,
      sortable: true 
    },
    {
      key: 'created_at',
      label: 'Fecha de Creación',
      render: TableRenderers.texto,
      sortable: true 
    },
    {
      key: 'verification',
      label: 'Verificación',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: TableRenderers.verificacion,
      sortable: false 
    }
  ];

  if (loading) {
    return <p className="text-center my-5">Cargando solicitudes...</p>;
  }

  return (
    <div className="container my-5">
      <div className="dashboard-header text-center mb-4">
        <h2>Panel de Socios</h2>
      </div>

      <SearchBar
        placeholder="Buscar por solicitante, ID, monto, estado o fecha..."
        value={searchText}
        onChange={setSearchText}
      />

      <div className="dashboard-header mb-3 mt-4">
        <h3 className="text-primary">Solicitudes de Crédito</h3>
      </div>

      <Table columns={columns} data={filteredData} />
    </div>
  );
}
