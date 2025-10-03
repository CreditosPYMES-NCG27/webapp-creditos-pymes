<div align="center">

# 🏦 Webapp Créditos PYMES

### Sistema de gestión de créditos para pequeñas y medianas empresas

---

</div>

## 📋 Requisitos previos

Asegúrate de tener instalado:

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | v18 o superior |
| npm         | incluido con Node |

---

## 🚀 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/CreditosPYMES-NCG27/webapp-creditos-pymes.git

# Navegar al directorio
cd webapp-creditos-pymes

# Cambiar a la rama de desarrollo
git checkout development

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

---

## 📦 Dependencias principales

Este proyecto utiliza **Vite + React** como base, más:

| Dependencia | Propósito |
|-------------|-----------|
| **Bootstrap** | Estilos responsivos y componentes UI |
| **@popperjs/core** | Soporte para componentes interactivos de Bootstrap |
| **react-router-dom** | Sistema de enrutamiento para la aplicación |

---

## 📁 Estructura del proyecto

```
src/
│
├── 📂 assets/                    # Recursos estáticos
│
├── 📂 components/                # Componentes globales reutilizables
│   ├── Navbar/
│   │   └── Navbar.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   └── Button/
│       └── Button.jsx
│
├── 📂 features/                  # Módulos y features específicos
│   │
│   ├── 📂 Heroe/                 # Micro-feature (componente único)
│   │   ├── HeroeSection.jsx
│   │   └── HeroeSection.css      # Estilos específicos del héroe
│   │
│   ├── 📂 Form/                  # Macro-feature (múltiples componentes)
│   │   ├── components/
│   │   │   ├── Inputs.jsx
│   │   │   └── Buttons.jsx
│   │   ├── formService.js
│   │   ├── useForm.js
│   │   └── Form.jsx
│   │
│   └── 📂 Table/                 # Macro-feature opcional
│       ├── components/
│       │   └── Table.jsx
│       ├── hooks/
│       │   └── useTable.js
│       ├── utils/
│       │   └── tableValidators.js
│       └── data/
│           └── tableMock.json
│
├── 📂 pages/                     # Páginas que orquestan features
│   ├── HomePage.jsx
│   ├── DashboardPage.jsx
│   └── AuthPage.jsx
│
├── 📂 routes/
│   └── AppRoutes.jsx             # Configuración de rutas
│
├── 📂 hooks/                     # Hooks globales
│   └── useFetch.js
│
├── 📂 context/                   # Contextos globales
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── 📂 utils/                     # Utilidades globales
│   └── formatDate.js
│
├── 📂 data/                      # Data y mocks globales
│   └── countries.json
│
├── App.jsx                       # Componente raíz
└── main.jsx                      # Punto de entrada
```

---

<div align="center">

**Desarrollado con ❤️ por el equipo NCG27**

</div>