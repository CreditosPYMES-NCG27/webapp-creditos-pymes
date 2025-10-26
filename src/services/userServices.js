const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccessToken() {
  const token = localStorage.getItem("sb-token");
  if (!token) throw new Error("Usuario no autenticado");
  return token;
}

const userServices = {};

userServices.getMyProfile = async () => {
    try {
        
        const token = await getAccessToken();
        console.log(token);
        
        const response = await fetch(`${BACKEND_URL}/api/v1/profiles/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || "Perfil no encontrado");
        }

        const profile = await response.json();
        return profile;

    } catch (err) {
        console.error("Error obteniendo el perfil del usuario:", err);
        return null;
    }
};

//fetch usuario por id - para operadores

userServices.getProfileById = async (user_id) => {
    try {
        const token = await getAccessToken();
        console.log(token);

        const response = await fetch(`${BACKEND_URL}/api/v1/profiles/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));

            if (response.status === 422) {
                throw new Error("Error de validación: ID inválido");
            }

            throw new Error(errorData.detail || "No se pudo obtener el perfil");
        }

        const profile = await response.json();
        return profile;

    } catch (err) {
        console.error("Error obteniendo el perfil por ID:", err);
        return null;
    }
};

export default userServices;
