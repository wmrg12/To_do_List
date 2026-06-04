import { getToken } from "./authService";

const BASE_URL = "https://localhost:3000/task";

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

function handleResponse(res) {
  return res.json().then((body) => {
    if (!res.ok) {
      const msg =
        body?.errors?.[0]?.message || body?.msg || `Error HTTP ${res.status}`;
      return Promise.reject(new Error(msg));
    }
    return body;
  });
}

// GET /task
export function getTasks(page = 1, limit = 10) {
  return fetch(`${BASE_URL}?page=${page}&limit=${limit}`, { headers: authHeaders() })
    .then(handleResponse)
    .then((body) => body);
}

// GET /task/:id
export function getTaskById(id) {
  return fetch(`${BASE_URL}/${id}`, { headers: authHeaders() })
    .then(handleResponse)
    .then((body) => body.data);
}

// POST /task
export function createTask(taskData) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(taskData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// PUT /task/:id
export function updateTask(id, taskData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(taskData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// PATCH /task/:id
export function patchTask(id, partialData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(partialData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// DELETE /task/:id
export function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// POST /task/:id/upload
export function uploadFile(taskId, file) {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${BASE_URL}/${taskId}/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// DELETE /task/:id/file
export function deleteFile(taskId) {
  return fetch(`${BASE_URL}/${taskId}/file`, {
    method: "DELETE",
    headers: authHeaders(),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

export async function downloadFile(taskId) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/${taskId}/download`, {
    headers: {
      Accept: "application/octet-stream",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error?.errors?.[0]?.message || "Error al descargar archivo"
    );
  }
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