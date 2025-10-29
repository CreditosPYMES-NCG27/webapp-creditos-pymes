import React from "react";

export const Pagination = ({page, totalPages, onPageChange}) => {

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <button
                className="btn btn-outline-primary"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                Anterior
            </button>

            <span>
                Página {page} de {totalPages}
            </span>

            <button
                className="btn btn-outline-primary"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Siguiente
            </button>
        </div>
    );
}