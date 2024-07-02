import React from "react";
import "./Offers.css";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Ubicación</h1>
        <h1>del negocio</h1>
        <p>Dar click para ir a la ubicación</p>
      </div>
      <div className="offers-right">
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d249.36214704495958!2d-78.4993784!3d-0.1985975!3m2!1i1024!2i768!4f13.1!4m6!3e2!4m0!4m3!3m2!1d-0.19860990514192878!2d-78.49942701503436!5e0!3m2!1ses-419!2sec!4v1717478400491!5m2!1ses-419!2sec"
          width="600"
          height="450"
          style={{ border: 0 }}
          
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa del negocio"
        ></iframe>
      </div>
    </div>
  );
};

export default Offers;
