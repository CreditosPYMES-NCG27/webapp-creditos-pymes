import './UserDashboard.css';
import { useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';
import { TableRenderers } from '@/components/Table/TableUtils';
import { fetchCreditApplications } from '@/services/creditService';
import Button from '@/components/Button/Button';

export default function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('sb-user'));
    if (!user) return;
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCreditApplications(user.id);
      setSolicitudes(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filtrado
  const filteredData = solicitudes.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.id.toLowerCase().includes(search) ||
      item.requested_amount?.toString().toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search) ||
      item.created_at?.toLowerCase().includes(search)
    );
  });

  // Columnas
  const columns = [
    { key: 'id', label: 'ID Solicitud', render: TableRenderers.idSolicitud },
    { key: 'requested_amount', label: 'Monto', render: TableRenderers.monto },
    { key: 'status', label: 'Estado', render: TableRenderers.estado },
    { key: 'created_at', label: 'Fecha', render: TableRenderers.texto },
    { key: 'acciones', label: 'Acciones', headerClassName: 'text-center', cellClassName: 'text-center', render: TableRenderers.acciones }
  ];

  if (loading) {
    return <p className="text-center my-5">Cargando solicitudes...</p>;
  }

  return (
    <div className="container my-5">
      <div className="dashboard-header text-center mb-4">
        <h2>Bienvenido {JSON.parse(localStorage.getItem('sb-user'))?.email}</h2>
      </div>

      <SearchBar
        placeholder="Buscar por ID, monto, estado o fecha..."
        value={searchText}
        onChange={setSearchText}
      />

      <div className="mb-4">
        <Button text="Crear Solicitud" color="trird" size="md" className="rounded-pill" action="alert"
        >
        </Button>
      </div>

      <div className="dashboard-header mb-3">
        <h3 className="text-primary">Mis Solicitudes</h3>
      </div>

      <Table columns={columns} data={filteredData} />
    </div>
  );
}
