import { useNotification } from '../contexts/NotificationContext';

/**
 * Hook personalizado para facilitar el uso de notificaciones
 * Proporciona métodos de conveniencia para mostrar diferentes tipos de notificaciones
 */
export const useNotifications = () => {
  const notificationContext = useNotification();

  return {
    // Métodos básicos
    showSuccess: notificationContext.showSuccess,
    showError: notificationContext.showError,
    showInfo: notificationContext.showInfo,
    showWarning: notificationContext.showWarning,
    
    // Métodos específicos para autenticación
    showLoginSuccess: notificationContext.showLoginSuccess,
    showLoginError: notificationContext.showLoginError,
    showLogoutSuccess: notificationContext.showLogoutSuccess,
    
    // Métodos específicos para operaciones CRUD
    showSaveSuccess: notificationContext.showSaveSuccess,
    showSaveError: notificationContext.showSaveError,
    showDeleteSuccess: notificationContext.showDeleteSuccess,
    showDeleteError: notificationContext.showDeleteError,
    
    // Métodos para errores comunes
    showNetworkError: notificationContext.showNetworkError,
    
    // Métodos de control
    clearAll: notificationContext.clearAllNotifications,
    addCustom: notificationContext.addNotification,
  };
};

export default useNotifications;
