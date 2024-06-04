import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({username:"",email:"",password:""});

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    }

  const login = async () => {
    let dataObj;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});
      console.log(dataObj);
      if (dataObj.success) {
        localStorage.setItem('auth-token',dataObj.token);
        window.location.replace("/");
      }
      else
      {
        alert(dataObj.errors)
      }
  }

  const signup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
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
  
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" placeholder="Tu nombre" name="username" value={formData.username} onChange={changeHandler}/>:<></>}
          <input type="email" placeholder="Correo electronico" name="email" value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={changeHandler}/>
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}>Continuar</button>

        {state==="Login"?
        <p className="loginsignup-login">Crear una cuenta? <span onClick={()=>{setState("Sign Up")}}>Click aquí</span></p>
        :<p className="loginsignup-login">Ya tienes una cuenta? <span onClick={()=>{setState("Login")}}>Login aquí</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
