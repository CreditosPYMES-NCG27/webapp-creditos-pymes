import './UserDashboard.css';
import { useState, useEffect } from 'react';
import { fetchCreditApplications } from '@/services/creditService';
import companyServices from '../../services/companyServices';

import { NewLoanBtn } from '../CreateNewLoan/NewLoanBtn';
import { TableRenderers } from '@/components/Table/TableUtils';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Pagination } from '../../components/Pagination';

export default function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const user = JSON.parse(localStorage.getItem('sb-user'));

  const loadCreditApplications = async (pageNumber = 1) => {
    if (!user) return;
    setLoading(true);

    try {
      const data = await fetchCreditApplications(user.id, pageNumber, limit);
      if (data) {
        setSolicitudes(data.items || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching credit applications:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCreditApplications(page);

    const loadCompany = async () => {
      try {
        const companyData = await companyServices.getMyCompanyDetails();
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company details:", err);
      }
    };
    loadCompany();
  }, [page]);

  const filteredData = solicitudes.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.id.toLowerCase().includes(search) ||
      item.requested_amount?.toString().toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search) ||
      item.created_at?.toLowerCase().includes(search)
    );
  });

  const paginatedData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  const columns = [
    { key: 'id', label: 'ID Solicitud', render: TableRenderers.idSolicitud, sortable: false },
    { key: 'requested_amount', label: 'Monto', render: TableRenderers.monto, sortable: true },
    { key: 'status', label: 'Estado', render: TableRenderers.estado, sortable: true },
    { key: 'created_at', label: 'Fecha', render: TableRenderers.texto, sortable: true },
    { key: 'acciones', label: 'Acciones', headerClassName: 'text-center', cellClassName: 'text-center', render: TableRenderers.acciones, sortable: false }
  ];

  return (
    <div className="container my-5">
      
      <div className="dashboard-header text-center mb-4">
        <h2>Bienvenido {user?.email}</h2>
      </div>

      <SearchBar placeholder="Buscar por ID, monto, estado o fecha..." value={searchText} onChange={setSearchText} />

      <div className="mb-4">
        <NewLoanBtn company={company} onSuccess={loadCreditApplications}/>
      </div>

      <div className="dashboard-header mb-3">
        <h3 className="text-primary">Mis Solicitudes</h3>
      </div>

      {loading ? (
        <p className="text-center my-5">Cargando solicitudes...</p>
      ) : (
        <>
          <div className="table-wrapper">
  <Table columns={columns} data={paginatedData} />
</div>
          <Pagination
            page={page}
            totalPages={Math.ceil(filteredData.length / limit)}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
