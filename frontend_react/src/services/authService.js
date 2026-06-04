const AUTH_BASE_URL = "https://localhost:3000/api/auth";

export function getToken() {
  return localStorage.getItem("token");
}

export async function register(email, password) {
  const res = await fetch(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || "Error al registrarse");
  }
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || "Error al iniciar sesion");
  }
  localStorage.setItem("token", data.token);
  return data.token;
}

export function logout() {
  localStorage.removeItem("token");
}
