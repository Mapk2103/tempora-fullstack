# Témpora - E-commerce de Relojes de Lujo

Aplicación web fullstack para la venta de relojes de lujo con sistema de autenticación, gestión de productos mediante CRUD completo y módulo de cotizaciones de oro.

## Tecnologías utilizadas

**Backend:**
- Node.js con Express
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para encriptación de contraseñas

**Frontend:**
- React 18
- Vite como build tool
- React Router DOM para navegación
- Axios para peticiones HTTP
- Context API para estado global

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 14 o superior)
- MongoDB (instalación local o cuenta en MongoDB Atlas)
- npm (incluido con Node.js)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mapk2103/tempora-fullstack.git
cd tempora-fullstack
```

### 2. Configurar el backend

Navegar a la carpeta del servidor e instalar dependencias:

```bash
cd server
npm install
```

Crear un archivo `.env` en la carpeta `server/` con las siguientes variables:

```env
NODE_ENV=development
PORT=5000

# Opción 1: MongoDB local
MONGODB_URI=mongodb://localhost:27017/tempora_db

# Opción 2: MongoDB Atlas (nube)
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tempora_db

# JWT Configuration
JWT_SECRET=cambiar_por_clave_secreta_segura
JWT_EXPIRE=30d
```

**Importante:** Reemplaza `JWT_SECRET` con una clave aleatoria y segura.

### 3. Configurar el frontend

```bash
cd ../client
npm install
```

### 4. Iniciar MongoDB

Si utilizas MongoDB de forma local:

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

## Ejecución

### Modo desarrollo

Abre dos terminales diferentes:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Servidor corriendo en: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Cliente corriendo en: `http://localhost:5173`

### Modo producción

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Estructura del proyecto

```
tempora-fullstack/
├── client/                 # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Vistas principales
│   │   ├── contexts/      # Contextos de React
│   │   ├── services/      # Configuración de API
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # API REST con Express
│   ├── controllers/       # Lógica de negocio
│   ├── models/            # Modelos de Mongoose
│   ├── routes/            # Definición de rutas
│   ├── middleware/        # Middlewares personalizados
│   ├── config/            # Configuración de BD
│   └── package.json
│
└── README.md
```

## Funcionalidades principales

### Autenticación y autorización
- Registro de usuarios con validación de datos
- Login con generación de tokens JWT
- Contraseñas hasheadas con bcrypt
- Middleware de protección de rutas
- Sistema de roles (administrador/usuario)

### Gestión de productos (CRUD)
- **Crear:** Panel administrativo para agregar nuevos relojes
- **Leer:** Visualización de catálogo de productos
- **Actualizar:** Edición de información de productos existentes
- **Eliminar:** Borrado de productos del sistema

### Sistema de cotizaciones
- Calculadora de valor de oro basada en peso y quilates
- Guardado de cotizaciones por usuario
- Historial de cotizaciones realizadas

## API Endpoints

### Autenticación
```
POST   /api/auth/register    # Crear nuevo usuario
POST   /api/auth/login       # Iniciar sesión
GET    /api/auth/me          # Obtener usuario autenticado
```

### Productos
```
GET    /api/products         # Listar todos los productos
GET    /api/products/:id     # Obtener producto específico
POST   /api/products         # Crear producto (admin)
PUT    /api/products/:id     # Actualizar producto (admin)
DELETE /api/products/:id     # Eliminar producto (admin)
```

### Cotizaciones
```
POST   /api/quotations                # Crear cotización
GET    /api/quotations/my-quotations  # Obtener mis cotizaciones
GET    /api/quotations                # Listar todas (admin)
PUT    /api/quotations/:id            # Actualizar cotización (admin)
DELETE /api/quotations/:id            # Eliminar cotización
```

## Variables de entorno

El proyecto utiliza variables de entorno para configuración sensible. Ver archivo `.env.example` en cada carpeta para referencia.

### Backend (server/.env)
- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto del servidor
- `MONGODB_URI`: String de conexión a MongoDB
- `JWT_SECRET`: Clave secreta para tokens JWT
- `JWT_EXPIRE`: Tiempo de expiración de tokens

## Despliegue

Para desplegar la aplicación en producción:

- **Backend:** Render, Railway o Heroku
- **Frontend:** Vercel o Netlify
- **Base de datos:** MongoDB Atlas (plan gratuito disponible)

Asegúrate de configurar las variables de entorno en cada plataforma de despliegue.

## Autor

Martín Peña - Proyecto Final de Desarrollo Web Fullstack

## Licencia

Este proyecto fue desarrollado con fines académicos.
