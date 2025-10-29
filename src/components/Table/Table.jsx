import { useState } from 'react';
import './Table.css';

export default function Table({ columns = [], data = [], className = "" }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (columnKey, isSortable) => {
    if (!isSortable) return;

    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

     
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }

     
      if (sortConfig.key === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      
      if (sortConfig.key === 'status') {
        const estadoOrder = { 'Pendiente': 1, 'Aprobado': 2, 'Rechazado': 3 };
        aValue = estadoOrder[aValue] || 999;
        bValue = estadoOrder[bValue] || 999;
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const SortIndicator = ({ columnKey, isSortable }) => {
    if (!isSortable) return null;

    const isActive = sortConfig.key === columnKey;
    const direction = sortConfig.direction;

    return (
      <span className={`sort-indicator ms-2 ${isActive ? 'active' : ''} ${isActive && direction === 'desc' ? 'desc' : ''}`}>
        <span className="sort-circle"></span>
      </span>
    );
  };

  const renderCell = (item, column) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }
    return value;
  };

  const sortedData = getSortedData();

  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-custom mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column, index) => {
                  const isSortable = column.sortable !== false;
                  return (
                    <th 
                      key={index} 
                      scope="col"
                      className={`${column.headerClassName || ""} ${isSortable ? 'sortable-header' : ''}`}
                      style={column.headerStyle}
                      onClick={() => handleSort(column.key, isSortable)}
                      title={isSortable ? 'Click para ordenar' : ''}
                    >
                      <span className="d-flex align-items-center justify-content-between">
                        <span>{column.label}</span>
                        <SortIndicator columnKey={column.key} isSortable={isSortable} />
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center text-muted py-4">
                    No hay datos disponibles
                  </td>
                </tr>
              ) : (
                sortedData.map((item, rowIndex) => (
                  <tr key={item.id || rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td 
                        key={colIndex}
                        className={column.cellClassName || ""}
                        style={column.cellStyle}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}