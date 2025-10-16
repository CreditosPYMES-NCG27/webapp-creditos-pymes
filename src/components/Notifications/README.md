# Sistema de Notificaciones

Este sistema proporciona notificaciones elegantes y reutilizables basadas en el branding del proyecto.

## Características

- ✅ **Notificaciones de éxito** - Para procesos completados exitosamente
- ❌ **Notificaciones de error** - Para procesos fallidos
- ℹ️ **Notificaciones informativas** - Para información general
- ⚠️ **Notificaciones de advertencia** - Para alertas importantes
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
- `showSuccess(message, options)` - Notificación de éxito
- `showError(message, options)` - Notificación de error
- `showInfo(message, options)` - Notificación informativa
- `showWarning(message, options)` - Notificación de advertencia

#### Métodos específicos para autenticación
- `showLoginSuccess(userName)` - Éxito al iniciar sesión
- `showLoginError(errorMessage)` - Error al iniciar sesión
- `showLogoutSuccess()` - Éxito al cerrar sesión

#### Métodos específicos para operaciones CRUD
- `showSaveSuccess(itemName)` - Éxito al guardar
- `showSaveError(itemName)` - Error al guardar
- `showDeleteSuccess(itemName)` - Éxito al eliminar
- `showDeleteError(itemName)` - Error al eliminar

#### Métodos para errores comunes
- `showNetworkError()` - Error de conexión

#### Métodos de control
- `clearAll()` - Limpiar todas las notificaciones
- `addCustom(notification)` - Agregar notificación personalizada

### 3. Opciones personalizadas

```jsx
notifications.showSuccess('Mensaje', {
  title: 'Título personalizado',
  duration: 3000, // 3 segundos
  showProgress: false, // Sin barra de progreso
});
```

### 4. Notificación personalizada

```jsx
notifications.addCustom({
  type: 'info',
  title: 'Título',
  message: 'Mensaje',
  duration: 5000,
  showProgress: true
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
- **Info**: Azul (`--blue-*`)
- **Advertencia**: Amarillo (`--yellow-*`)

## Posicionamiento

Las notificaciones aparecen en la esquina superior derecha de la pantalla y se apilan verticalmente. En dispositivos móviles se adaptan al ancho completo de la pantalla.

## Accesibilidad

- Botón de cerrar con `aria-label`
- Contraste adecuado de colores
- Soporte para modo oscuro
- Animaciones respetan las preferencias del usuario
