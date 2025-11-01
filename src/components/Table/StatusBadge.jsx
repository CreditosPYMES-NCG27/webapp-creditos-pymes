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
            case "in_review":
                return "badge-in-review";
            default:
                return "badge-in-review";
        }
    };

    return <span className={`badge badge-estado ${getClass(status)}`}>{status}</span>;
}
