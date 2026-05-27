import { useState } from "react";
import { createTask } from "../services/taskService";

export default function TaskForm({ onCreated }) {
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    // POST /task
    createTask({ title: title.trim(), description: description.trim(), completed: false })
      .then((newTask) => {
        onCreated(newTask);
        setTitle("");
        setDescription("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form__title">Nueva Tarea</h2>

      {error && <p className="task-form__error">⚠ {error}</p>}

      <div className="task-form__group">
        <label htmlFor="task-title" className="task-form__label">Título *</label>
        <input
          id="task-title"
          className="task-form__input"
          type="text"
          placeholder="¿Qué hay que hacer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="task-form__group">
        <label htmlFor="task-desc" className="task-form__label">Descripción</label>
        <textarea
          id="task-desc"
          className="task-form__textarea"
          placeholder="Detalles opcionales..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading || !title.trim()}
      >
        {loading ? "Guardando…" : "+ Agregar Tarea"}
      </button>
    </form>
  );
}
