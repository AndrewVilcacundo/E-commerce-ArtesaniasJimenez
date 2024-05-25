import React from "react";
import "./Hero.css";
import hero_image from "../Assets/artesanias_local.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Artesanias Jimenez</h2>
        <div>
          <div className="hero-hand-icon">
            <p>BIENVENIDO</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Variedad</p>
          <p>en artesanias</p>
          <h2>Productos hechos a mano en Fibras Naturales</h2>
        </div>
        <div className="hero-latest-btn">
          <div>A continuación</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
