# To-Do List

Aplicación web para la gestión de tareas con autenticación JWT, almacenamiento de archivos y base de datos MongoDB Atlas.

## Tecnologías utilizadas

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* Multer
* HTTPS

### Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/wmrg12/To_do_List.git
cd To_do_List
```

---

## 2. Instalar dependencias

### Backend

```bash
cd backend_express
npm install
```

### Frontend

```bash
cd ../frontend_react
npm install
```

---

## 3. Configurar MongoDB Atlas

### Crear una base de datos

1. Crear una cuenta en MongoDB Atlas.
2. Crear un nuevo proyecto.
3. Crear un clúster gratuito (Free Tier).
4. Crear un usuario de base de datos.
5. Configurar el acceso de red para permitir conexiones desde la IP actual.
6. Seleccionar:

```text
Connect → Drivers → Node.js
```

7. Copiar la cadena de conexión generada por Atlas.

Ejemplo:

```text
mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/todo_list
```

---

## 4. Configurar variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend_express`.

Contenido (ejemplo):

```env
JWT_SECRET=mi_clave_super_secreta
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/todo_list
```

### Descripción de las variables

| Variable    | Descripción                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| JWT_SECRET  | Clave utilizada para generar y validar los tokens JWT. Puede ser cualquier texto. |
| MONGODB_URI | Cadena de conexión obtenida desde MongoDB Atlas.                                  |

---

## 5. Configurar certificados HTTPS

Desde la raíz del proyecto:

```bash
mkdir certs
```

Generar certificados autofirmados:

```bash
openssl req -x509 -newkey rsa:2048 -nodes \
-keyout certs/key.pem \
-out certs/cert.pem \
-days 365
```

Durante la generación se solicitarán algunos datos (país, organización, etc.). Estos campos pueden completarse o dejarse vacíos.

Al finalizar deberán existir los siguientes archivos:

```text
certs/
├── cert.pem
└── key.pem
```

Estos certificados son únicamente para desarrollo local.

---

## 6. Generar datos de prueba

Desde la carpeta `backend_express`:

```bash
npm run seed
```

Si el script no está configurado:

```bash
node seed.js
```

El seed creará automáticamente:

* Un usuario de prueba.
* Tareas de ejemplo para probar el CRUD.

### Usuario de prueba

```text
Email: raccy@test.com
Contraseña: 123456
```

---

# Ejecución del proyecto

## Iniciar Backend

Desde la carpeta `backend_express`:

```bash
npm start
```

Servidor HTTPS:

```text
https://localhost:3000
```

---

## Iniciar Frontend

Desde la carpeta `frontend_react`:

```bash
npm run dev
```

Aplicación React:

```text
https://localhost:5173
```
---

# Prueba rápida

1. Clonar el repositorio.
2. Instalar dependencias del backend.
3. Instalar dependencias del frontend.
4. Crear una base de datos en MongoDB Atlas.
5. Crear el archivo `.env`.
6. Crear los certificados HTTPS.
7. Ejecutar el seed.
8. Iniciar el backend.
9. Iniciar el frontend.
10. Abrir la aplicación en el navegador.
11. Iniciar sesión con:

```text
Email: raccy@test.com
Contraseña: 123456
```

---

# Uso con Postman

## Obtener token JWT

Realizar una petición:

```http
POST https://localhost:3000/api/auth/login
```

### Headers

```http
Accept: application/json
Content-Type: application/json
```

### Body

```json
{
  "email": "raccy@test.com",
  "password": "123456"
}
```

### Respuesta esperada

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Obtener token desde el navegador

También es posible obtener el token JWT desde la aplicación web.

1. Iniciar sesión en la aplicación.
2. Presionar `F12` para abrir las herramientas de desarrollador.
3. Ir a la pestaña **Application** (Chrome/Edge) o **Storage** (Firefox).
4. Abrir **Local Storage**.
5. Seleccionar el dominio de la aplicación.
6. Copiar el valor almacenado correspondiente al token JWT.

Este token puede utilizarse posteriormente en Postman.

---

## Configuración de Headers para rutas protegidas

Agregar los siguientes encabezados:

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer <token>
```

Ejemplo:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# Endpoints de archivos

## Obtener archivos

```http
GET https://localhost:3000/api/files
```

Headers:

```http
Authorization: Bearer <token>
```

---

## Subir archivo

```http
POST https://localhost:3000/api/files/upload
```

Headers:

```http
Authorization: Bearer <token>
```

Body → form-data

| Key  | Type |
| ---- | ---- |
| file | File |

Seleccionar cualquier archivo local y enviar la petición.

---

## Descargar archivo

```http
GET https://localhost:3000/api/files/{id}/download
```

Ejemplo:

```http
GET https://localhost:3000/api/files/6a2628716ce7d6a79ca77296/download
```

Headers:

```http
Authorization: Bearer <token>
```

---

## Eliminar archivo

```http
DELETE https://localhost:3000/api/files/{id}
```

Ejemplo:

```http
DELETE https://localhost:3000/api/files/6a2628716ce7d6a79ca77296
```

Headers:

```http
Authorization: Bearer <token>
```

---

# Funcionalidades implementadas

* Registro de usuarios.
* Inicio de sesión mediante JWT.
* Persistencia de sesión.
* CRUD completo de tareas.
* Gestión de archivos (subida, descarga y eliminación).
* Base de datos MongoDB Atlas.
* Servidor HTTPS.
* Datos de prueba mediante seed.
* Interfaz web desarrollada con React.

---

# Estructura general del proyecto

```text
To_do_List
├── backend_express
│   ├── bin
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── seed.js
│   ├── .env
│   └── package.json
│
├── frontend_react
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
│
└── certs
    ├── cert.pem
    └── key.pem
```
