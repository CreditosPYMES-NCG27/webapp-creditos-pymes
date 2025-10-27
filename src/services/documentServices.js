const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

const documentServices = {};

documentServices.getDocuments = async ({ application_id, page = 1, limit = 10, order = "desc" } = {}) => {
  try {
    const token = await getAccessToken();

    const params = new URLSearchParams();
    
    if (!application_id) {
      throw new Error("application_id is required to fetch documents");
    }

    params.append("application_id", application_id);
    params.append("page", page);
    params.append("limit", limit);
    params.append("order", order);

    const response = await fetch(`${BACKEND_URL}/api/v1/documents/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "No se pudieron obtener los documentos");
    }

    return await response.json();

  } catch (err) {
    console.error("Error obteniendo documentos:", err);
    return null;
  }
};

export default documentServices;