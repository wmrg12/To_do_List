import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar 
  useEffect(() => {
    getTasks()
      .then((body) => setTasks(body.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Agregar 
  const handleCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Actualizar
  const handleUpdated = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  // Eliminar
  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <h1 className="app__title">To-Do List</h1>
        <div className="app__stats">
          <span className="stat stat--pending">{pending} pendientes</span>
          <span className="stat stat--done">{completed} completadas</span>
        </div>
      </header>

      <main className="app__main">
        {/* Formulario */}
        <TaskForm onCreated={handleCreated} />

        {/* Estado de carga */}
        {loading && <p className="app__status">Cargando tareas…</p>}
        {error && <p className="app__error">{error}</p>}

        {/* Lista */}
        {!loading && !error && tasks.length === 0 && (
          <p className="app__empty">No hay tareas aun. Crea una!!!!</p>
        )}

        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;