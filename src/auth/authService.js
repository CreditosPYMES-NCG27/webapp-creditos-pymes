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
        showNotification.showError(`Error al iniciar sesión: ${error.message}`);
      }
      
      return { error };
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem("sb-token", data.session.access_token);
    localStorage.setItem("sb-user", JSON.stringify(data.user));


    // Mostrar notificación de éxito si se proporciona la función
    if (showNotification) {
      const userName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Usuario';
      showNotification.showSuccess(`¡Bienvenido, ${userName}! Has iniciado sesión correctamente.`);
    }

    return { user: data.user, session: data.session };
  } catch (err) {
    console.error("⚠️ Error inesperado:", err);
    
    // Mostrar notificación de error si se proporciona la función
    if (showNotification) {
      showNotification.showError('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
    }
    
    return { error: err };
  }
}

export function getStoredSession() {
  const token = localStorage.getItem("sb-token");
  const userRaw = localStorage.getItem("sb-user");
  if (!token || !userRaw) return null;
  try {
    const user = JSON.parse(userRaw);
    return { token, user };
  } catch {
    return null;
  }
}

export function getStoredRole(fallbackRole = null) {

  try {
    const userRaw = localStorage.getItem("sb-user");
    if (userRaw) {
      const user = JSON.parse(userRaw);
      const metaRole = user?.user_metadata?.role || user?.app_metadata?.role;
      if (metaRole) return metaRole;
    }
  } catch {}
  const appRole = localStorage.getItem("app-role");
  return appRole || fallbackRole;
}

export function setAppRole(role) {
  if (role) localStorage.setItem("app-role", role);
}


export async function logoutUser(showNotification = null) {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("sb-token");
    localStorage.removeItem("sb-user");
    
    if (showNotification) {
      showNotification.showSuccess('Has cerrado sesión correctamente.');
    }
  } catch (err) {
    console.error("⚠️ Error al cerrar sesión:", err);
    
    if (showNotification) {
      showNotification.showError("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  }
}
