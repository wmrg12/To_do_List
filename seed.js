const mongoose = require("mongoose");
const Task = require("./backend_express/models/task");

const mongoDB = "mongodb://cooluser:1234@ac-ecv0hmz-shard-00-00.q3t5u8z.mongodb.net:27017,ac-ecv0hmz-shard-00-01.q3t5u8z.mongodb.net:27017,ac-ecv0hmz-shard-00-02.q3t5u8z.mongodb.net:27017/local_library?ssl=true&replicaSet=atlas-vo850n-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoDB);

const tasks = [
  {
    title: "Estudiar React",
    description: "Practicar componentes y hooks",
    completed: false
  },
  {
    title: "Aprender Express",
    description: "Revisar middleware y rutas",
    completed: true
  },
  {
    title: "Practicar MongoDB",
    description: "Realizar consultas con Mongoose",
    completed: false
  },
  {
    title: "Completar laboratorio",
    description: "Finalizar implementación CRUD",
    completed: true
  },
  {
    title: "Leer documentación REST",
    description: "Revisar métodos HTTP",
    completed: false
  },
  {
    title: "Preparar pruebas en Postman",
    description: "Verificar endpoints de la API",
    completed: true
  },
  {
    title: "Implementar paginación",
    description: "Agregar page y limit",
    completed: false
  },
  {
    title: "Actualizar README",
    description: "Documentar instalación y uso",
    completed: true
  },
  {
    title: "Practicar PATCH",
    description: "Actualizar campos parciales",
    completed: false
  },
  {
    title: "Revisar manejo de errores",
    description: "Validar respuestas 404 y 500",
    completed: false
  },
  {
    title: "Estudiar Node.js",
    description: "Repasar módulos y eventos",
    completed: true
  },
  {
    title: "Practicar Git",
    description: "Realizar commits y branches",
    completed: false
  },
  {
    title: "Revisar arquitectura MVC",
    description: "Entender modelos, vistas y controladores",
    completed: true
  },
  {
    title: "Aprender HTTP",
    description: "Estudiar métodos y códigos de estado",
    completed: false
  },
  {
    title: "Configurar MongoDB Atlas",
    description: "Verificar conexión remota",
    completed: true
  },
  {
    title: "Practicar consultas",
    description: "Usar find, save y update",
    completed: false
  },
  {
    title: "Implementar validaciones",
    description: "Agregar campos requeridos",
    completed: true
  },
  {
    title: "Corregir errores",
    description: "Depurar respuestas de la API",
    completed: false
  },
  {
    title: "Practicar rutas REST",
    description: "Revisar endpoints CRUD",
    completed: true
  },
  {
    title: "Optimizar proyecto",
    description: "Revisar estructura y organización",
    completed: false
  }
];

async function seedDB() {

  try {

    await Task.deleteMany({});

    await Task.insertMany(tasks);

    console.log("Datos insertados correctamente");

    mongoose.connection.close();

  } catch (error) {

    console.log(error);

  }

}

seedDB();
