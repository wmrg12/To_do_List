import { useState } from "react";
import { login, register } from "../services/authService";

export default function LoginForm({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await login(email, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await register(email, password);
      setPassword("");
      setMode("login");
      setSuccess("Cuenta creada. Inicia sesion con tu email y contrasena.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <div className="login-form">
      <h2 className="login-form__title">
        {isLogin ? "Iniciar sesion" : "Crear cuenta"}
      </h2>

      {success && <p className="login-form__success">{success}</p>}
      {error && <p className="login-form__error">{error}</p>}

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <div className="login-form__group">
          <label htmlFor="auth-email" className="login-form__label">
            Email
          </label>
          <input
            id="auth-email"
            className="login-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="login-form__group">
          <label htmlFor="auth-password" className="login-form__label">
            Contrasena
          </label>
          <input
            id="auth-password"
            className="login-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={6}
          />
        </div>

        <button className="login-form__btn" type="submit" disabled={loading}>
          {loading
            ? isLogin
              ? "Entrando..."
              : "Registrando..."
            : isLogin
              ? "Entrar"
              : "Registrarse"}
        </button>
      </form>

      <p className="login-form__switch">
        {isLogin ? (
          <>
            No tienes cuenta?{" "}
            <button
              type="button"
              className="login-form__link"
              onClick={() => switchMode("register")}
            >
              Registrate
            </button>
          </>
        ) : (
          <>
            Ya tienes cuenta?{" "}
            <button
              type="button"
              className="login-form__link"
              onClick={() => switchMode("login")}
            >
              Inicia sesion
            </button>
          </>
        )}
      </p>
    </div>
  );
}
