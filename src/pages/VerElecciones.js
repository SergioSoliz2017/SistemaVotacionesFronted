import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import axios from "axios";
/*const VerElecciones = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Cargo(s) a elección</th>
          <th>Fecha</th>
          <th>Detalle</th>
          <th>Convocatoria</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  );
};

export default VerElecciones;*/

const VerElecciones = ({ lista }) => {
  //const numRows = 4; // Número de filas
  const url = "http://localhost:8000/";

  const handleVerDetalleClick = () => {
    console.log("Ver detalle");
  };
  const [listaElecciones,setListaElecciones] = useState([])
  // array con el número de filas
  /*const rows = Array.from(Array(numRows), (_, index) => (
    <tr key={index}>
      <td>Cargo a elección {index + 1}</td>
      <td>Fecha {index + 1}</td>
      <td>
        <button onClick={handleVerDetalleClick} className="ver-detalle-button">
          Ver Detalle
        </button>
      </td>
      <td>
        <button onClick={handleVerDetalleClick} className="ver-detalle-button">
          Ver Convocatoria
        </button>
      </td>
    </tr>
  ));*/
  useEffect(() => {
    axios.get(url + "elecciones").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  return (
    <table>
      <thead>
        <tr>
          <th>Cargo(s) a elección</th>
          <th>Fecha</th>
          <th>Detalle</th>
          <th>Convocatoria</th>
        </tr>
      </thead>
      <tbody>
        { listaElecciones.length > 0 &&
        listaElecciones.map((eleccion) => {
          return(
            <tr>
            <th>{eleccion.MOTIVO_ELECCION}</th>
            <th>{eleccion.FECHA_ELECCION}</th>
            <th>{eleccion.Detalle}</th>
            <th>{eleccion.Convocatoria}</th>
          </tr>
          )
          
        })}
        
      </tbody>
    </table>
  );
};

export default VerElecciones;
