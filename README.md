# Témpora - Tienda de Relojes de Lujo ⌚

Aplicación web fullstack para la venta de relojes de lujo con sistema de autenticación, gestión de productos (CRUD completo) y cotizaciones de oro.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

Necesitas tener instalado lo siguiente:

```
Node.js (v14 o superior)
MongoDB (local o cuenta en MongoDB Atlas)
npm (viene con Node.js)
Git
```

### Instalación 🔧

Sigue estos pasos para configurar el entorno de desarrollo:

**1. Clonar el repositorio**

```bash
git clone https://github.com/TU_USUARIO/tempora-fullstack.git
cd tempora-fullstack
```

**2. Configurar el Backend**

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server/` con las siguientes variables:

```env
NODE_ENV=development
PORT=5000

# MongoDB - Opción 1: Base de datos local
MONGODB_URI=mongodb://localhost:27017/tempora_db

# MongoDB - Opción 2: MongoDB Atlas (nube)
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/tempora_db

# JWT Secret (cambiar por una clave segura)
JWT_SECRET=tu_clave_secreta_super_segura_cambiala_por_favor
JWT_EXPIRE=30d
```

**3. Configurar el Frontend**

```bash
cd ../client
npm install
```

**4. Iniciar MongoDB (si usas instalación local)**

Windows:
```bash
mongod
```

Mac/Linux:
```bash
sudo systemctl start mongod
```

## Ejecutando la aplicación ⚙️

### Modo Desarrollo

Necesitas **dos terminales** abiertas:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
El servidor correrá en `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
El cliente correrá en `http://localhost:5173`

### Modo Producción

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

## Despliegue 📦

Para desplegar en producción:

1. **Backend**: Render.com, Railway, Heroku
2. **Frontend**: Vercel, Netlify
3. **Base de datos**: MongoDB Atlas (gratuito)

Ver archivo `.env.example` en cada carpeta para las variables de entorno necesarias.

## Construido con 🛠️

### Backend
* [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
* [Express](https://expressjs.com/) - Framework web para Node.js
* [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
* [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
* [JWT](https://jwt.io/) - Autenticación mediante tokens
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Encriptación de contraseñas

### Frontend
* [React](https://reactjs.org/) - Biblioteca de JavaScript para interfaces
* [Vite](https://vitejs.dev/) - Build tool y dev server
* [React Router](https://reactrouter.com/) - Enrutamiento para React
* [Axios](https://axios-http.com/) - Cliente HTTP para consumir APIs
* [Context API](https://reactjs.org/docs/context.html) - Manejo de estado global

## Funcionalidades Principales ✨

### Autenticación y Seguridad 🔐
- ✅ Registro de usuarios con validación
- ✅ Login con JWT
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Rutas protegidas (middleware de autenticación)
- ✅ Roles de usuario (admin/usuario)

### CRUD de Productos 📦
- ✅ **Crear**: Panel de admin para agregar relojes
- ✅ **Leer**: Listado de productos con detalles
- ✅ **Actualizar**: Editar información de productos
- ✅ **Eliminar**: Borrado de productos (admin)

### Sistema de Cotizaciones 💰
- ✅ Calculadora de valor de oro
- ✅ Guardar cotizaciones personalizadas
- ✅ Historial de cotizaciones por usuario

## Estructura del Proyecto 📂

```
tempora-fullstack/
├── client/                     # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── contexts/          # Context API
│   │   ├── services/          # Servicios API (axios)
│   │   └── App.jsx            # Componente principal
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Node.js/Express
│   ├── controllers/           # Lógica de negocio
│   ├── models/                # Modelos de Mongoose
│   ├── routes/                # Rutas de la API
│   ├── middleware/            # Middleware de autenticación
│   ├── config/                # Configuración de BD
│   ├── index.js               # Punto de entrada
│   └── package.json
│
└── README.md
```

## Endpoints de la API 🌐

### Autenticación
```
POST   /api/auth/register    - Registrar nuevo usuario
POST   /api/auth/login       - Iniciar sesión
GET    /api/auth/me          - Obtener usuario actual (requiere auth)
```

### Productos
```
GET    /api/products         - Obtener todos los productos
GET    /api/products/:id     - Obtener un producto
POST   /api/products         - Crear producto (solo admin)
PUT    /api/products/:id     - Actualizar producto (solo admin)
DELETE /api/products/:id     - Eliminar producto (solo admin)
```

### Cotizaciones
```
POST   /api/quotations                - Crear cotización (requiere auth)
GET    /api/quotations/my-quotations  - Mis cotizaciones
GET    /api/quotations                - Todas (solo admin)
PUT    /api/quotations/:id            - Actualizar (admin)
DELETE /api/quotations/:id            - Eliminar
```

## Uso de la Aplicación 💻

### Como Usuario
1. Registrarse en `/registro`
2. Iniciar sesión en `/login`
3. Ver productos disponibles en `/products`
4. Realizar cotizaciones de oro en `/vender-oro`
5. Ver mis cotizaciones en `/mis-cotizaciones`

### Como Administrador
1. Iniciar sesión con credenciales de admin
2. Acceder al panel de administración en `/admin`
3. Crear, editar y eliminar productos
4. Ver todas las cotizaciones de usuarios

## Autor ✒️

* **Martín Peña** - *Desarrollo Fullstack* - [GitHub](https://github.com/TU_USUARIO)

## Licencia 📄

Este proyecto fue desarrollado como proyecto académico para la materia de Desarrollo Web Fullstack.

---
⌨️ con ❤️ por [Martín Peña](https://github.com/TU_USUARIO) 😊
