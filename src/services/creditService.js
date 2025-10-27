// src/services/creditService.js
import { supabase } from '@/auth/supabaseClient';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

// Obtiene las solicitudes del usuario logueado
export async function fetchCreditApplications(userId) {
  try {
    const { data, error } = await supabase
      .from('credit_applications')
      .select('id, requested_amount, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Error al obtener solicitudes:', err);
    return [];
  }
}
export async function fetchAllCreditApplications() {
  try {
    const { data, error } = await supabase
      .from('credit_applications')
      .select(`
        id,
        requested_amount,
        status,
        created_at,
        user_id,
        company_id,
        users:user_id (
          email,
          full_name
        ),
        companies (
          legal_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      ...item,
      applicant_name:
        item.companies?.legal_name ||
        item.users?.full_name ||
        item.users?.email ||
        'Sin identificar'
    }));
  } catch (err) {
    console.error('❌ Error al obtener todas las solicitudes:', err);
    return [];
  }
}

// export async function createNewLoan(userId) {
//   try {
//     const { data, error } = await supabase
//       .from('credit_applications')
//       .select('id, requested_amount, status, created_at')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   } catch (err) {
//     console.error('❌ Error al obtener solicitudes:', err);
//     return [];
//   }
// }

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

