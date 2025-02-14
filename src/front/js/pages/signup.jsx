import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import { Button } from "react-bootstrap";
import { Loader } from "../component/loader";
import Swal from "sweetalert2";
import { Footer } from '../component/footer';

export const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const actualizador = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      Swal.fire({
        title: "Registro exitoso",
        text: "¡Ahora puedes iniciar sesión!",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "alerta",
          title: "titulo",
          confirmButton: "boton",
        },
      });

      setError(null);
      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Reintentar",
        customClass: {
          popup: "error-alert",
          title: "error-title",
          confirmButton: "error-button",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={actualizador}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={actualizador}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={actualizador}
          required
        />
        {error && <p className="error">{error}</p>}
        <Button className="button1" type="submit">
          Registrarse
        </Button>
      </form>
    </section>
  );
};
