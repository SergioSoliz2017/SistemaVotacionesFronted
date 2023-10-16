import React from 'react';
import FcytImage from '../assets/fcyt.png';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <img src={FcytImage} alt="Logo FCyT" className="fcyt-image" />
      <div className="welcome-text">
        <h2>Bienvenido al sistema administrador de elecciones de la Facultad de Ciencias y Tecnología</h2>
      </div>
    </div>
  );
};



export default Inicio;
