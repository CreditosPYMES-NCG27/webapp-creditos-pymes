import React, { useEffect, useState } from 'react';
import './Notification.css';

// Iconos SVG como componentes
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const Notification = ({ 
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  showProgress = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Mostrar notificación con delay para animación
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-close si no está en hover
    let hideTimer;
    if (duration > 0) {
      hideTimer = setTimeout(() => {
        if (!isHovered) {
          handleClose();
        }
      }, duration);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, isHovered]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.(id);
    }, 300); // Esperar a que termine la animación
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  const notificationClass = `notification notification--${type} ${isVisible ? 'show' : 'hide'}`;

  return (
    <div
      className={notificationClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--duration': `${duration}ms` }}
    >
      <div className="notification__icon">
        {getIcon()}
      </div>
      
      <div className="notification__content">
        {title && <h4 className="notification__title">{title}</h4>}
        {message && <p className="notification__message">{message}</p>}
      </div>
      
      <button 
        className="notification__close"
        onClick={handleClose}
        aria-label="Cerrar notificación"
      >
        <CloseIcon />
      </button>
      
      {showProgress && duration > 0 && (
        <div className="notification__progress">
          <div 
            className={`notification__progress-bar ${!isHovered ? 'animate' : ''}`}
            style={{ '--duration': `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
