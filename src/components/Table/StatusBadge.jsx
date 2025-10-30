import "../Table/Table.css";

export default function StatusBadge({ status }) {
    const getClass = (status) => {
        switch (status) {
            case "pending":
                return "badge-pendiente";
            case "approved":
                return "badge-aprobado";
            case "rejected":
                return "badge-rechazado";
            default:
                return "bg-secondary";
        }
    };

    return <span className={`badge badge-estado ${getClass(status)}`}>{status}</span>;
}
