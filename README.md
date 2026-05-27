# To-Do List API

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Pug + Bootstrap 
- Method-Override

---

## Instalación

Clonar el repositorio e ingresar a la carpeta del proyecto:

```bash
git clone https://github.com/wmrg12/To_do_List.git
cd To_do_List
```

Instalar las dependencias:

```bash
npm install
```

La conexión a la base de datos ya está configurada en el proyecto.

---

## Ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Generar datos iniciales
npm run seed

# Desarrollo
npm run devstart

# Ejecución normal
npm start
```

---

## Estructura del proyecto

```text
.
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── bin/
│   └── www
├── controllers/
│   └── taskController.js
├── models/
│   └── task.js
├── public/
│   └── stylesheets/
├── routes/
│   ├── index.js
│   ├── task.js
│   └── users.js
└── views/
    ├── error.pug
    ├── index.pug
    ├── layout.pug
    └── task/
```

---

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/task` | Listar todas las tareas |
| GET | `/task/:id` | Obtener una tarea por ID |
| POST | `/task` | Crear una tarea |
| PUT | `/task/:id` | Actualizar completamente una tarea |
| PATCH | `/task/:id` | Actualizar parcialmente una tarea |
| DELETE | `/task/:id` | Eliminar una tarea |

---

## Respuestas

Todas las respuestas son JSON con la siguiente estructura:

```json
{
    "metadata": {
        "version": "1.0"
    },
    "data": [],
    "links": {},
    "errors": null
}
```

Se puede probar con Postman.