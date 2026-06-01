import { getToken } from "./authService";

const BASE_URL = "http://localhost:3000/task";

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// procesar respuesta 
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
