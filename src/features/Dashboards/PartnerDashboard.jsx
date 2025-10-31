import './UserDashboard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table/Table';
import SearchBar from '@/components/SearchBar/SearchBar';
import { fetchCreditApplications } from '../../services/creditService';
import { Pagination } from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import companyServices from '../../services/companyServices';

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const loadCreditApplications = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await fetchCreditApplications(null, pageNumber, limit, null, null);
      setSolicitudes(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching credit applications:', err);
      setSolicitudes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const loadCompany = async () => {
    try {
      const data = await companyServices.getCompanies({ page: 1, limit: 1 });
      const companyData = data?.items?.[0] || null;
      setCompany(companyData);
    } catch (err) {
      console.error('Error fetching company details:', err);
      setCompany(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCompany();
      await loadCreditApplications(page);
    };
    fetchData();
  }, [page]);

  // Only include loans with status pending, approved, or rejected
  const validStatuses = ['pending', 'approved', 'rejected', 'in_review'];
  const filteredData = solicitudes
    .filter((item) => validStatuses.includes(item.status.toLowerCase()))
    .map((item) => ({
      ...item,
      legal_name: company?.legal_name || '—', // 🔹 Asigna el nombre legal de la empresa
    }))
    .filter((item) => {
      const search = searchText.toLowerCase();
      return (
        item.legal_name?.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.applicant_name?.toLowerCase().includes(search) ||
        item.requested_amount?.toString().toLowerCase().includes(search) ||
        item.status?.toLowerCase().includes(search) ||
        item.created_at?.toLowerCase().includes(search)
      );
    });

  const paginatedData = filteredData;

  // Custom renderers
  const renderText = (value) => value;
  const renderId = (value) => <span className="fw-semibold">## {value}</span>;
  const renderAmount = (value) => `$${value}`;
  const renderStatus = (value) => {
    const getBadgeClass = (status) => {
      switch (status) {
        case 'pending': return 'badge-pendiente';
        case 'approved': return 'badge-aprobado';
        case 'rejected': return 'badge-rechazado';
        default: return 'bg-secondary';
      }
    };
    return <span className={`badge badge-estado ${getBadgeClass(value)}`}>{value}</span>;
  };
  const renderVerification = (value, item) => {
    const getIcon = (status) => {
      switch (status.toLowerCase()) {
        case 'approved':
          return <FontAwesomeIcon icon={faCircleCheck} className="text-success me-2" title="Aprobado" />;
        case 'rejected':
          return <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-2" title="Rechazado" />;
        default:
          return <FontAwesomeIcon icon={faCircleExclamation} className="text-warning me-2" title="Pendiente" />;
      }
    };

    return (
      <div className="d-flex justify-content-center align-items-center gap-2">
        {getIcon(item.status)}
        <FontAwesomeIcon
          icon={faEye}
          className="text-dark cursor-pointer"
          title="Ver detalles"
          onClick={() => navigate(`/partner/loan-details/${item.id}`)}
        />
      </div>
    );
  };

  const columns = [
    { key: 'legal_name', label: 'Solicitante', render: renderText, sortable: true },
    { key: 'id', label: 'Solicitud', render: renderId, sortable: false },
    { key: 'requested_amount', label: 'Monto', render: renderAmount, sortable: true },
    { key: 'status', label: 'Estado', render: renderStatus, sortable: true },
    { key: 'created_at', label: 'Fecha de Creación', render: renderText, sortable: true },
    {
      key: 'verification',
      label: 'Verificación',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: renderVerification,
      sortable: false
    }
  ];

  if (loading) return <p className="text-center my-5">Cargando solicitudes...</p>;

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

      <Table columns={columns} data={paginatedData} />

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}