// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// export async function getAccessToken() {
//   const token = localStorage.getItem("sb-token");
//   if (!token) throw new Error("Usuario no autenticado");
//   return token;
// }

// const helloSignServices = {};


// helloSignServices.requestSignature = async ({ signerEmail, signerName, fileUrl }) => {
//   const token = await getAccessToken();

//   try {
//     const response = await fetch(`${SUPABASE_URL}/functions/v1/request-signature`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({ signerEmail, signerName, fileUrl }),
//     });

//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       throw new Error(JSON.stringify(data)); // <-- stringify object
//     }

//     return data;
//   } catch (err) {
//     console.error("Error enviando solicitud de firma:", err);
//     throw err;
//   }
// };

// export default helloSignServices;


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

const helloSignServices = {};

/**
 * Request a signature from HelloSign for a document.
 * @param {Object} params
 * @param {string} params.documentId - Document ID in backend (temporary or permanent)
 * @param {string} params.signerEmail - Signer's email
 * @param {string} params.signerName - Signer's name
 * @param {string} params.callbackUrl - Webhook URL to notify signature events
 */
helloSignServices.requestSignature = async ({ documentId, signerEmail, signerName, callbackUrl }) => {
  const token = await getAccessToken();

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/documents/${documentId}/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        signer_email: signerEmail,
        signer_name: signerName,
        callback_url: callbackUrl,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    // data: { signature_request_id, signing_url, expires_at }
    return data;
  } catch (err) {
    console.error("Error enviando solicitud de firma:", err);
    throw err;
  }
};

export default helloSignServices;