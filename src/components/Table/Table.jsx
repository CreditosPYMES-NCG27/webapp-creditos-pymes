import './Table.css';

export default function Table({ columns = [], data = [], className = "" }) {
  
  // Renderiza el contenido de cada celda según el tipo de columna
  const renderCell = (item, column) => {
    const value = item[column.key];

    // Si la columna tiene un render personalizado, usarlo
    if (column.render) {
      return column.render(value, item);
    }

    // Por defecto, mostrar el valor tal cual
    return value;
  };

  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-custom mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index} 
                    scope="col"
                    className={column.headerClassName || ""}
                    style={column.headerStyle}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center text-muted py-4">
                    No hay datos disponibles
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
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