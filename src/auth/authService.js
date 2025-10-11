import { supabase } from "./supabaseClient";

export async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Error al iniciar sesión:", error.message);
      return { error };
    }

    //oken en localStorage
    localStorage.setItem("sb-token", data.session.access_token);
    localStorage.setItem("sb-user", JSON.stringify(data.user));

    return { user: data.user, session: data.session };
  } catch (err) {
    console.error("⚠️ Error inesperado:", err);
    return { error: err };
  }
}

/**
 * Cierra la sesión actual.
 */
export async function logoutUser() {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("sb-token");
    localStorage.removeItem("sb-user");
  } catch (err) {
    console.error("⚠️ Error al cerrar sesión:", err);
  }
}
