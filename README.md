# Proyecto de Streaming de Películas - Backend Node.js

Este es el backend para un sistema de streaming de películas. El proyecto está construido usando **Node.js**, **Express**, y **Sequelize** con base de datos **PostgreSQL**. Implementa autenticación JWT y manejo de roles (admin, usuario) para controlar el acceso y permisos.

## Características

- **Autenticación JWT**: Seguridad mediante tokens JWT para autenticar usuarios y proteger rutas.
- **Roles de usuario**: Implementación de roles como `admin` y `user` para controlar el acceso a distintas partes del sistema.
- **Gestión de usuarios**: CRUD para gestionar usuarios, incluyendo validación de datos.
- **API para Películas**: Permite administrar películas, con filtrado y búsqueda.
  
## Requisitos

- Node.js (versión 14 o superior)
- PostgreSQL
- Herramientas de desarrollo como Postman o Insomnia para probar las API

## Instalación

1. **Clonar el repositorio**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. **Instalar dependencias**

    Navega al directorio del proyecto e instala las dependencias con npm:

    ```bash
    cd <directorio_del_proyecto>
    npm install
    ```

3. **Configurar variables de entorno**

    Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

    ```plaintext
    JWT_SECRET_KEY=<tu_clave_secreta_para_jwt>
    DB_HOST=localhost
    DB_USER=<usuario_postgresql>
    DB_PASSWORD=<contraseña_postgresql>
    DB_NAME=<nombre_base_datos>
    PORT=3000
    ```

4. **Ejecutar la aplicación**

    Inicia el servidor con el siguiente comando:

    ```bash
    npm start
    ```

    El servidor debería estar corriendo en [http://localhost:3000](http://localhost:3000).

## Rutas disponibles

### 1. **Usuarios**

- `POST /api/v1/users`: Crear un nuevo usuario.
- `GET /api/v1/users`: Obtener todos los usuarios (requiere autenticación y permisos de admin).
- `GET /api/v1/users/:id`: Obtener un usuario por ID (requiere autenticación).
- `PUT /api/v1/users/:id`: Actualizar un usuario por ID (requiere autenticación).
- `DELETE /api/v1/users/:id`: Eliminar un usuario por ID (requiere permisos de admin).

### 2. **Autenticación**

- `POST /api/v1/auth/login`: Iniciar sesión con email y contraseña. Devuelve un token JWT.
- `POST /api/v1/auth/logout`: Cerrar sesión invalidando el token JWT.


## Estructura del Proyecto

```plaintext
├── config/               # Configuración de la base de datos y entorno
├── controllers/          # Lógica de negocio para cada endpoint
├── middlewares/          # Middleware de validación y autenticación
├── models/               # Modelos Sequelize para la base de datos
├── routers/              # Rutas y manejo de los endpoints
├── services/             # Servicios auxiliares para el negocio
├── utils/                # Funciones utilitarias
├── .env                  # Variables de entorno
├── index.js              # Configuración principal del servidor
├── package.json          # Dependencias y scripts
└── README.md             # Documentación del proyecto
