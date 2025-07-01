// components/ExampleCarouselImage.jsx
import React from "react";
import pokestop from "../assets/pokestop.jpg";

const ExampleCarouselImage = ({ src, alt, text }) => {
  return (
    <div>
      <img
        className="d-block w-100" // Clases de Bootstrap para imagen responsiva
        src={pokestop} // Fuente de la imagen (URL o ruta local)
        alt={pokestop} // Texto alternativo obligatorio
      />
      {text && <div style={{ textAlign: "center", padding: "10px" }}>{text}</div>} // Texto opcional
    </div>
  );
};

export default ExampleCarouselImage;