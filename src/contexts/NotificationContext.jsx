import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationContainer from '../components/Notifications/NotificationContainer';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      showProgress: true,
      ...notification,
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Métodos de conveniencia para diferentes tipos de notificaciones
  const showSuccess = useCallback((message, options = {}) => {
    return addNotification({
      type: 'success',
      title: '¡Éxito!',
      message,
      ...options,
    });
  }, [addNotification]);

  const showError = useCallback((message, options = {}) => {
    return addNotification({
      type: 'error',
      title: 'Error',
      message,
      duration: 7000, // Los errores se muestran más tiempo
      ...options,
    });
  }, [addNotification]);

  const showInfo = useCallback((message, options = {}) => {
    return addNotification({
      type: 'info',
      title: 'Información',
      message,
      ...options,
    });
  }, [addNotification]);

  const showWarning = useCallback((message, options = {}) => {
    return addNotification({
      type: 'warning',
      title: 'Advertencia',
      message,
      duration: 6000,
      ...options,
    });
  }, [addNotification]);

  // Métodos específicos para casos comunes
  const showLoginSuccess = useCallback((userName) => {
    return showSuccess(`¡Bienvenido, ${userName}! Has iniciado sesión correctamente.`, {
      duration: 4000,
    });
  }, [showSuccess]);

  const showLoginError = useCallback((errorMessage = 'Credenciales incorrectas') => {
    return showError(`Error al iniciar sesión: ${errorMessage}`, {
      duration: 6000,
    });
  }, [showError]);

  const showLogoutSuccess = useCallback(() => {
    return showInfo('Has cerrado sesión correctamente.', {
      duration: 3000,
    });
  }, [showInfo]);

  const showSaveSuccess = useCallback((itemName = 'datos') => {
    return showSuccess(`${itemName} guardados correctamente.`, {
      duration: 4000,
    });
  }, [showSuccess]);

  const showSaveError = useCallback((itemName = 'datos') => {
    return showError(`Error al guardar ${itemName}. Inténtalo de nuevo.`, {
      duration: 6000,
    });
  }, [showError]);

  const showDeleteSuccess = useCallback((itemName = 'elemento') => {
    return showSuccess(`${itemName} eliminado correctamente.`, {
      duration: 4000,
    });
  }, [showSuccess]);

  const showDeleteError = useCallback((itemName = 'elemento') => {
    return showError(`Error al eliminar ${itemName}. Inténtalo de nuevo.`, {
      duration: 6000,
    });
  }, [showError]);

  const showNetworkError = useCallback(() => {
    return showError('Error de conexión. Verifica tu internet e inténtalo de nuevo.', {
      duration: 8000,
    });
  }, [showError]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoginSuccess,
    showLoginError,
    showLogoutSuccess,
    showSaveSuccess,
    showSaveError,
    showDeleteSuccess,
    showDeleteError,
    showNetworkError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
