import './UserDashboard.css';
import { useState, useEffect } from 'react';

//services
import { fetchCreditApplications } from '@/services/creditService';
import companyServices from '../../services/companyServices';
import { NewLoanBtn } from '../CreateNewLoan/NewLoanBtn';

//components
import { TableRenderers } from '@/components/Table/TableUtils';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Pagination } from '../../components/Pagination';
import StatusBadge from '../../components/Table/StatusBadge';
import ActionsDropdown from './ActionDropdown';

export default function UserDashboard() {
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState(""); // NEW: column filter for date
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  // modal state per loan
  const [openModals, setOpenModals] = useState({});

  const user = JSON.parse(localStorage.getItem('sb-user'));

  const loadCreditApplications = async (pageNumber = 1) => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await fetchCreditApplications(user.id, pageNumber, limit);
      setLoans(data.items || []);
      setTotalPages(data.totalPages || 1);
      setLimit(data.perPage || limit);
    } catch (err) {
      console.error("Error fetching credit applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (loanId) => {
    setOpenModals(prev => ({
      ...prev,
      [loanId]: !prev[loanId],
    }));
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

  // Filter with search text and date column
  const filteredData = loans.filter((item) => {
    const search = searchText.toLowerCase();
    const dateStr = item.created_at ? item.created_at.split('T')[0] : "";

    return (
      (item.id.toLowerCase().includes(search) ||
        item.requested_amount?.toString().toLowerCase().includes(search) ||
        item.status?.toLowerCase().includes(search)) &&
      (!dateFilter || dateStr === dateFilter)
    );
  });

  const paginatedData = filteredData;

  const columns = [
    {
      key: "id",
      label: "ID Solicitud",
      render: (value) => <span className="fw-semibold">## {value}</span>,
    },
    {
      key: "requested_amount",
      label: "Monto",
      render: (value) => `$${value}`,
      sortable: true,
    },
    {
      key: "status",
      label: "Estado",
      render: (value) => <StatusBadge status={value} />,
      sortable: true,
    },
    {
      key: "created_at",
      label: "Fecha",
      render: (value) => new Date(value).toLocaleDateString(),
      filter: {
        type: "date",
        value: dateFilter,
        onChange: setDateFilter,
      },
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (value, row) => (
        <ActionsDropdown
          row={row}
          company={company}
          isOpen={!!openModals[row.id]}
          toggleModal={() => toggleModal(row.id)}
          onSuccess={loadCreditApplications}
        />
      ),
    },
  ];

  return (
    <div className="container my-5">
      <div className="dashboard-header text-center mb-4">
        <h2>Bienvenido {user?.email}</h2>
      </div>

      <SearchBar placeholder="Buscar por ID, monto o estado..." value={searchText} onChange={setSearchText} />

      <div className="mb-4">
        <NewLoanBtn company={company} onSuccess={loadCreditApplications} />
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
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}