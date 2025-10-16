# Sistema de Notificaciones

Este sistema proporciona notificaciones elegantes y reutilizables basadas en el branding del proyecto.

## Características

- ✅ **Notificaciones de éxito** - Para procesos completados exitosamente
- ❌ **Notificaciones de error** - Para procesos fallidos
  
- 🎨 **Diseño basado en branding** - Usa la paleta de colores del proyecto
- 📱 **Responsive** - Se adapta a dispositivos móviles
- ⏱️ **Auto-cierre** - Se cierran automáticamente después de un tiempo
- 🎯 **Pausa en hover** - Se pausan cuando el usuario pasa el mouse
- 🎭 **Animaciones suaves** - Transiciones elegantes de entrada y salida

## Uso Básico

### 1. Usar el hook useNotifications

```jsx
import { useNotifications } from '../../hooks/useNotifications';

const MiComponente = () => {
  const notifications = useNotifications();

  const handleSuccess = () => {
    notifications.showSuccess('¡Operación completada!');
  };

  const handleError = () => {
    notifications.showError('Algo salió mal');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Éxito</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
};
```

### 2. Métodos disponibles

#### Métodos básicos
- `showSuccess(message)` - Notificación de éxito
- `showError(message)` - Notificación de error

API mínima: no hay métodos de conveniencia; usa `showSuccess` y `showError`.

#### Métodos de control
- `clearAll()` - Limpiar todas las notificaciones
- `addCustom(notification)` - Agregar notificación personalizada

### 3. Opciones personalizadas

API simplificada sin opciones: las notificaciones tienen duración y barra de progreso por defecto.

### 4. Notificación personalizada

```jsx
notifications.addCustom({
  type: 'success', // o 'error'
  title: 'Título',
  message: 'Mensaje'
});
```

## Integración con Autenticación

El sistema ya está integrado con el servicio de autenticación. Los métodos `loginUser` y `logoutUser` aceptan un parámetro opcional para mostrar notificaciones:

```jsx
import { loginUser } from '@/auth/authService';
import { useNotifications } from '@/hooks/useNotifications';

const MiComponente = () => {
  const notifications = useNotifications();

  const handleLogin = async (email, password) => {
    await loginUser(email, password, notifications);
  };
};
```

## Estilos

Las notificaciones usan las variables CSS del proyecto:

- **Éxito**: Verde (`--green-*`)
- **Error**: Rojo (`--red-*`)
  

## Posicionamiento

Las notificaciones aparecen en la esquina superior derecha de la pantalla y se apilan verticalmente. En dispositivos móviles se adaptan al ancho completo de la pantalla.

## Accesibilidad

- Botón de cerrar con `aria-label`
- Contraste adecuado de colores
- Soporte para modo oscuro
- Animaciones respetan las preferencias del usuario
