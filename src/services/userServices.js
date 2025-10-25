// services/profileServices.js
import { supabase } from "../auth/supabaseClient";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const userServices = {};

userServices.getMyProfile = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error("Usuario no autenticado");

        const response = await fetch(`${BACKEND_URL}/api/v1/profiles/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`
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

export default userServices;
