import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/MAPA.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Ubicación</h1>
        <h1>del negocio</h1>
        <p>	Dar click a la imagen para ir a la ubicación</p>
      </div>
      <div className="offers-right">
        <a href="https://www.google.com/maps/@-0.1985975,-78.4993784,21z?entry=ttu" target="_blank" rel="noopener noreferrer">
          <img src={exclusive_image} alt="Mapa del negocio" />
        </a>
      </div>
    </div>
  );
};

export default Offers;
