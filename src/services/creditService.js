const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

export async function fetchCreditApplications(user_id, page = 1, limit = 10, status = null, company_id = null) {
  try {
    const token = await getAccessToken();

    const query = new URLSearchParams();
    query.append("page", page);
    query.append("limit", limit);
    if (status) query.append("status", status);
    if (company_id) query.append("company_id", company_id);

    const response = await fetch(`${BACKEND_URL}/api/v1/credit-applications/?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener las solicitudes de crédito");
    }

    const data = await response.json();

    // Adaptamos la respuesta para que tenga items y totalPages
    return {
      items: data.items || data || [],
      totalPages: data.totalPages || 1
    };

  } catch (err) {
    console.error("Error obteniendo las solicitudes de crédito:", err);
    return { items: [], totalPages: 1 };
  }
}

export async function getLoanById(loan_id) {
  try {

    const token = await getAccessToken();

    // Fetch the loan by ID
    const response = await fetch(`${BACKEND_URL}/api/v1/credit-applications/${loan_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener la solicitud de crédito");
    }

    const loanData = await response.json();
    return loanData;

  } catch (err) {
    console.error("Error obteniendo la solicitud de crédito:", err);
    return null;
  }
}

export async function createNewLoan(newLoanData) {
  try {

    const token = await getAccessToken();

    const response = await fetch(`${BACKEND_URL}/api/v1/credit-applications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newLoanData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al crear la solicitud de crédito");
    }

    const createdLoan = await response.json();
    return createdLoan;

  } catch (err) {
    console.error("Error creando la solicitud de crédito:", err);
    return null;
  }
};

//Actualiza el estado de una solicitud de crédiot - operadores
export async function updateLoanStatus(applicationId, newStatus, currentLoanData) {
  try {
    const token = await getAccessToken();

    const bodyData = {
      ...currentLoanData,
      status: newStatus
    };

    const response = await fetch(`${BACKEND_URL}/api/v1/credit-applications/${applicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al actualizar la solicitud de crédito");
    }

    const updatedLoan = await response.json();
    return updatedLoan;

  } catch (err) {
    console.error("Error actualizando la solicitud de crédito:", err);
    return null;
  }
};

