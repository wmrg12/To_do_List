const API_BASE_URL = "http://localhost:3000/task";

export const api = {

  async getTasks(page = 1, limit = 5) {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al obtener las tareas";
      throw new Error(msg);
    }
    return response.json();
  },


  async getTaskDetail(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al obtener los detalles de la tarea";
      throw new Error(msg);
    }
    return response.json();
  },


  async createTask(title, description) {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        completed: false
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al crear la tarea";
      throw new Error(msg);
    }
    return response.json();
  },

  async patchTask(id, fields) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(fields)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al actualizar la tarea";
      throw new Error(msg);
    }
    return response.json();
  },

  async updateTask(id, title, description, completed) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        completed
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al guardar los cambios";
      throw new Error(msg);
    }
    return response.json();
  },

  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.errors?.[0]?.message || "Error al eliminar la tarea";
      throw new Error(msg);
    }
    return response.json();
  }
};
