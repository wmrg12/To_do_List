import { useEffect, useState } from "react";
import { getFiles, uploadFile, downloadFile, deleteFile } from "../services/fileService";

function formatDate(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  return (
    d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " - " +
    d.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    getFiles()
      .then((data) => setFiles(data))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const newFile = await uploadFile(selectedFile);
      setFiles((prev) => [...prev, newFile]);
      setMessage("Archivo subido correctamente");
      setTimeout(() => setMessage(""), 2000);
      setSelectedFile(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este archivo?")) return;
    try {
      await deleteFile(id);
      setFiles((prev) => prev.filter((f) => f._id !== id));
      setMessage("Archivo eliminado correctamente");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      alert(err.message);
    }
  };

return (
  <section className="file-manager">
    <h2>Drive</h2>
    <div className="file-upload">
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button
        className="btn btn--primary btn--sm"
        onClick={handleUpload}
      >
        Subir archivo
      </button>
    </div>

    {message && <p className="file-message">{message}</p>}
    {loading && <p>Cargando archivos...</p>}
    {!loading && files.length === 0 && <p>No hay archivos.</p>}

    <ul className="file-list">
      {files.map((file) => (
        <li key={file._id} className="file-item">
          <div className="file-info">
            <strong>{file.filename}</strong>
            <small>{formatDate(file.createdAt)}</small>
          </div>

          <div className="file-actions">
            <button
              className="btn btn--secondary btn--sm"
              onClick={() => downloadFile(file._id)}
            >
              Descargar
            </button>

            <button
              className="btn btn--danger btn--sm"
              onClick={() => handleDelete(file._id)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
}