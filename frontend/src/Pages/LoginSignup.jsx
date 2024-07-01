import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const validateFields = () => {
    if (state === "Login") {
      if (!formData.email || !formData.password) {
        alert("Por favor, complete todos los campos.");
        return false;
      }
    } else if (state === "Sign Up") {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("Por favor, complete todos los campos.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
      }
    } else if (state === "Recover Password") {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        alert("Por favor, complete todos los campos.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
      }
    }
    return true;
  }

  const login = async () => {
    if (!validateFields()) return;

    let dataObj;
    await fetch('${process.env.REACT_APP_API_URL}/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });
    console.log(dataObj);
    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors)
    }
  }

  const signup = async () => {
    if (!validateFields()) return;
  
    try {
      console.log("Formulario enviado:", formData);
      const response = await fetch('${process.env.REACT_APP_API_URL}/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        alert('Usuario registrado. Se ha enviado un correo de verificación.');
        window.location.replace("/login");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  

  const recoverPassword = async () => {
    if (!validateFields()) return;

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Contraseña restablecida con éxito");
        window.location.replace("/login");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input type="text" placeholder="Tu nombre" name="username" value={formData.username} onChange={changeHandler} />
          )}
          <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={changeHandler} />
          {(state === "Recover Password" || state === "Sign Up") && (
            <input type="password" placeholder="Confirmar Contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} />
          )}
        </div>

        <button onClick={() => {
          if (state === "Login") login();
          else if (state === "Sign Up") signup();
          else if (state === "Recover Password") recoverPassword();
        }}>Continuar</button>

        {state === "Login" ? (
          <>
            <p className="loginsignup-login">Crear una cuenta? <span onClick={() => { setState("Sign Up") }}>Click aquí</span></p>
            <p className="loginsignup-login">Olvidaste tu contraseña? <span onClick={() => { setState("Recover Password") }}>Click aquí</span></p>
          </>
        ) : (
          <p className="loginsignup-login">Ya tienes una cuenta? <span onClick={() => { setState("Login") }}>Login aquí</span></p>
        )}

        {/* <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginSignup;
