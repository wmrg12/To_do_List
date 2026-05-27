const BASE_URL = "http://localhost:3000/task";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// procesar respuesta 
function handleResponse(res) {
  return res.json().then((body) => {
    if (!res.ok) {
      const msg =
        body?.errors?.[0]?.message || `Error HTTP ${res.status}`;
      return Promise.reject(new Error(msg));
    }
    return body;
  });
}

// GET /task  
export function getTasks(page = 1, limit = 10) {
  return fetch(`${BASE_URL}?page=${page}&limit=${limit}`, { headers })
    .then(handleResponse)
    .then((body) => body);
}

// GET /task/:id  
export function getTaskById(id) {
  return fetch(`${BASE_URL}/${id}`, { headers })
    .then(handleResponse)
    .then((body) => body.data);
}

// POST /task  
export function createTask(taskData) {
  return fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(taskData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// PUT /task/:id  
export function updateTask(id, taskData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(taskData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// PATCH /task/:id 
export function patchTask(id, partialData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(partialData),
  })
    .then(handleResponse)
    .then((body) => body.data);
}

// DELETE /task/:id  
export function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  })
    .then(handleResponse)
    .then((body) => body.data);
}
