import { supabase } from "./supabaseClient";

export async function loginUser(email, password, showNotification = null) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Error al iniciar sesión:", error.message);
      
      // Mostrar notificación de error si se proporciona la función
      if (showNotification) {
        showNotification.showLoginError(error.message);
      }
      
      return { error };
    }

    // Guardar token en localStorage
    localStorage.setItem("sb-token", data.session.access_token);
    localStorage.setItem("sb-user", JSON.stringify(data.user));

    // Mostrar notificación de éxito si se proporciona la función
    if (showNotification) {
      const userName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Usuario';
      showNotification.showLoginSuccess(userName);
    }

    return { user: data.user, session: data.session };
  } catch (err) {
    console.error("⚠️ Error inesperado:", err);
    
    // Mostrar notificación de error si se proporciona la función
    if (showNotification) {
      showNotification.showNetworkError();
    }
    
    return { error: err };
  }
}

/**
 * Cierra la sesión actual.
 */
export async function logoutUser(showNotification = null) {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("sb-token");
    localStorage.removeItem("sb-user");
    
    // Mostrar notificación de éxito si se proporciona la función
    if (showNotification) {
      showNotification.showLogoutSuccess();
    }
  } catch (err) {
    console.error("⚠️ Error al cerrar sesión:", err);
    
    // Mostrar notificación de error si se proporciona la función
    if (showNotification) {
      showNotification.showError("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  }
}
