import { useEffect, useState } from "react";
import { getToken, logout } from "./services/authService";
import { getTasks } from "./services/taskService";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import FileManager from "./components/FileManager";
import "./App.css";

function TodoDashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getTasks()
      .then((body) => {
        if (!cancelled) setTasks(body.data || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdated = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">To-Do List</h1>
        <div className="app__stats">
          <span className="stat stat--pending">{pending} pendientes</span>
          <span className="stat stat--done">{completed} completadas</span>
        </div>
        <button type="button" className="app__logout" onClick={onLogout}>
          Cerrar sesion
        </button>
      </header>

      <main className="app__main">
        <section className="tasks-section">
          <TaskForm onCreated={handleCreated} />
          {loading && <p className="app__status">Cargando tareas...</p>}
          {error && <p className="app__error">{error}</p>}
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
    </section>
    <FileManager />
  </main>
  </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken());

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">To-Do List</h1>
        </header>
        <main className="app__main">
          <LoginForm onLogin={handleLogin} />
        </main>
      </div>
    );
  }

  return <TodoDashboard onLogout={handleLogout} />;
}

export default App;
