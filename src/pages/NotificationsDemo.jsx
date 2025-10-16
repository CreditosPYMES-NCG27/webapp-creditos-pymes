import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

export default function NotificationsDemo() {
  const { showSuccess, showError, clearAllNotifications } = useNotification();

  const commonOptions = { duration: 4000 };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Demo de Notificaciones</h2>
      <p>Haz clic en los botones para ver las notificaciones disponibles.</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => showSuccess('Operación exitosa')}>
          Success
        </button>
        <button onClick={() => showError('Ocurrió un error inesperado')}>
          Error
        </button>
        <button onClick={() => clearAllNotifications()}>
          Limpiar todas
        </button>
      </div>

      <hr style={{ margin: '24px 0' }} />

      <h3>Variaciones</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => showSuccess('Notificación de éxito')}>Éxito</button>
        <button onClick={() => showError('Notificación de error')}>Error</button>
      </div>
    </div>
  );
}


