import { getToken } from "./authService";

const BASE_URL = "https://localhost:3000/api/files";

function authHeaders() {
  const token = getToken();
  return {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

function handleResponse(res) {
  return res.json().then((body) => {
    if (!res.ok) {
      const msg = body?.errors?.[0]?.message || body?.msg || `Error HTTP ${res.status}`;
      return Promise.reject(new Error(msg));
    }
    return body;
  });
}

// GET /api/files
export function getFiles() {
  return fetch(BASE_URL, { headers: authHeaders() })
    .then(handleResponse)
    .then((body) => body.data);
}

// POST /api/files/upload
export function uploadFile(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    body: formData,
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// DELETE /api/files/:id
export function deleteFile(fileId) {
  return fetch(`${BASE_URL}/${fileId}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(handleResponse);
}

// GET /api/files/:id/download
export async function downloadFile(fileId) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/${fileId}/download`, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
  });

  if (!response.ok) throw new Error("Error al descargar archivo");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  const disposition = response.headers.get("Content-Disposition");
  let filename = "archivo";
  if (disposition) {
    const match = disposition.match(/filename="?(.+)"?/);
    if (match) filename = match[1];
  }

  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}