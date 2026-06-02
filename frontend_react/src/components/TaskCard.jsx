import { useState } from "react";
import { patchTask, deleteTask, updateTask, uploadFile, deleteFile, downloadFile } from "../services/taskService";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) +
    " - " +
    d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function TaskCard({ task, onUpdated, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleToggle = () => {
    patchTask(task._id, { completed: !task.completed })
      .then((updated) => onUpdated(updated))
      .catch((err) => alert("Error: " + err.message));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setSaving(true);
    updateTask(task._id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      completed: task.completed,
    })
      .then((updated) => {
        onUpdated(updated);
        setEditing(false);
      })
      .catch((err) => alert("Error al guardar: " + err.message))
      .finally(() => setSaving(false));
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setEditing(false);
  };

  const handleDelete = () => {
    if (!window.confirm(`Eliminar "${task.title}"?`)) return;
    deleteTask(task._id)
      .then(() => onDeleted(task._id))
      .catch((err) => alert("Error al eliminar: " + err.message));
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    uploadFile(task._id, selectedFile)
      .then((updated) => {
        onUpdated(updated);
        setSelectedFile(null);
      })
      .catch((err) => alert("Error al subir archivo: " + err.message))
      .finally(() => setUploading(false));
  };

  const handleDeleteFile = () => {
    if (!window.confirm("Eliminar el archivo adjunto?")) return;
    deleteFile(task._id)
      .then((updated) => onUpdated(updated))
      .catch((err) => alert("Error al eliminar archivo: " + err.message));
  };

  if (editing) {
    return (
      <form className="task-card task-card--editing" onSubmit={handleSave}>
        <div className="task-form__group">
          <label className="task-form__label">Titulo *</label>
          <input
            className="task-form__input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="task-form__group">
          <label className="task-form__label">Descripcion</label>
          <textarea
            className="task-form__textarea"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            rows={2}
          />
        </div>
        <div className="task-card__actions">
          <button type="submit" className="btn btn--primary btn--sm" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card__header">
        <button
          className={`task-card__toggle ${task.completed ? "done" : ""}`}
          onClick={handleToggle}
          title={task.completed ? "Marcar pendiente" : "Marcar completada"}
        >
          {task.completed ? "c" : "p"}
        </button>
        <h3 className="task-card__title">{task.title}</h3>
      </div>

      {task.description && (
        <p className="task-card__desc">{task.description}</p>
      )}

      <p className="task-card__date">Creada: {formatDate(task.createdAt)}</p>

      <div className="task-card__file">
        {task.filePath ? (
          <div className="task-card__file-info">
            <span> + Archivo adjunto</span>
            <button className="btn btn--danger btn--sm" onClick={() => downloadFile(task._id).catch(err => alert("Error al descargar: " + err.message))}>
              Descargar archivo
            </button>

            <button className="btn btn--danger btn--sm" onClick={handleDeleteFile}>
              Eliminar archivo
            </button>
          </div>
        ) : (
          <div className="task-card__file-upload">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button
              className="btn btn--secondary btn--sm"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? "Subiendo..." : "Subir archivo"}
            </button>
          </div>
        )}
      </div>

      <div className="task-card__footer">
        <span className={`task-card__badge ${task.completed ? "badge--done" : "badge--pending"}`}>
          {task.completed ? "Completada" : "Pendiente"}
        </span>
        <div className="task-card__actions">
          <button className="btn btn--secondary btn--sm" onClick={() => setEditing(true)}>
            Editar
          </button>
          <button className="btn btn--danger btn--sm" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
