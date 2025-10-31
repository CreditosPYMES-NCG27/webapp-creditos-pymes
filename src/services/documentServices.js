import { supabase } from "../auth/supabaseClient";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

const documentServices = {};

export const DocumentTypes = {
  TAX_RETURN: "tax_return",
  FINANCIAL_STATEMENT: "financial_statement",
  ID_DOCUMENT: "id_document",
  BUSINESS_LICENSE: "business_license",
  BANK_STATEMENT: "bank_statement",
  OTHER: "other",
};

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

//Guardar un documento en supbase storage
documentServices.uploadLoanDocument = async (loanId, documentType, file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${loanId}_${documentType}_${Date.now()}.${fileExt}`;
    const filePath = `private/${fileName}`;

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        metadata: {
          application_id: loanId,
          document_type: documentType,
          user_id: user?.id,
        },
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error subiendo ${documentType}:`, error);
    return null;
  }
};

//Borrar un documento por el nombre de archivo
documentServices.deleteLoanDocument = async (fileName) => {
  try {
    const filePath = `private/${fileName}`; // full path in the bucket

    const { data, error } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (error) throw error;

    console.log(`Archivo eliminado correctamente: ${fileName}`);
    return data;
  } catch (error) {
    console.error(`Error eliminando archivo:`, error);
    return null;
  }
};

export default documentServices;