import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css"
import { useNavigate  } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Loader } from "../component/loader";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { Footer } from '../component/footer';

export const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { actions } = useContext(Context)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoged = await actions.login(email, password);
  
    if (isLoged) {
      navigate("/session/profile");
    } else {


      Swal.fire({
        title: "Error",
        text: "Email o contraseña incorrecta",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        footer: '<a href="/forgot-password">¿Olvidaste tu contraseña?</a>',
        customClass: {
          popup: "alerta",
          title: "titulo",
          confirmButton: "boton",
        },
      });
    }
  };

  const [isLoading, setIsLoading] = useState(false);
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(timer); 
      }, []);
    
    const inicioLoader = async () => {
      setIsLoading(true);
        await waitingWarever();
        setIsLoading(false);
    
    }
    
    useEffect(() => {
        inicioLoader();
    }, []) 

  return (isLoading) ? <Loader /> : (
    <>
      <section className="container">
        <h1>Log in</h1>
        <form
          className="formulario"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={email}
            placeholder="Correo electrónico"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <Button className="button1" type="submit"> Entrar </Button>
        </form>
      </section>
    </>
  )
}