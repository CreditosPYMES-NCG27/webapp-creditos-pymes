import './UserDashboard.css';
import { useState, useEffect } from 'react';

//services
import { fetchCreditApplications } from '@/services/creditService';
import companyServices from '../../services/companyServices';

//components
import { NewLoanBtn } from '../CreateNewLoan/NewLoanBtn';
import { TableRenderers } from '@/components/Table/TableUtils';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';

export default function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('sb-user'));
    if (!user) return;

    const loadData = async () => {
      setLoading(true);

      // Fetch credit applications separado de company details
      //Esto permite que aún que uno de los fecth falle no afecte al otro
      try {
        const data = await fetchCreditApplications(user.id);
        setSolicitudes(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching credit applications:", err);
      }

      //se llama company details desde el parent para evitar demoras en cargar el modal
      try {
        const company = await companyServices.getMyCompanyDetails();
        setCompany(company);
      } catch (err) {
        console.error("Error fetching company details:", err);
      }

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
    {
      key: 'id',
      label: 'ID Solicitud',
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
      label: 'Fecha',
      render: TableRenderers.texto,
      sortable: true
    },
    {
      key: 'acciones',
      label: 'Acciones',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: TableRenderers.acciones,
      sortable: false
    }
  ];

  // if (loading) {
  //   return <p className="text-center my-5">Cargando solicitudes...</p>;
  // }

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
        <NewLoanBtn company={company}/>
      </div>

      <div className="dashboard-header mb-3">
        <h3 className="text-primary">Mis Solicitudes</h3>
      </div>

      <Table columns={columns} data={filteredData} />
    </div>
  );
}