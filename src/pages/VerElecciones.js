import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones2.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const VerElecciones = ({ lista }) => {
  //const numRows = 4; // Número de filas
  const navigate = useNavigate();
  const url = "http://localhost:8000/";

  const [listaElecciones,setListaElecciones] = useState([])

  useEffect(() => {
    axios.get(url + "elecciones").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  const handleDetallesClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Detalles de la elección"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    navigate(`/actualizarEleccion/${id}`);
  };

  const handleConvocatoriaClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    navigate(`/PdfConvocatoria/${id}`);
  };
  return (
    <div className="ver-elecciones">
      <h3>ELECCIONES ACTIVAS</h3>
    <table>
      <thead>
        <tr>
          <th>CARGO(S) A ELECCION</th>
          <th>FECHA</th>
          <th>DETALLE</th>
          <th>CONVOCATORIA</th>
        </tr>
      </thead>
      <tbody>
        { listaElecciones.length > 0 &&
        listaElecciones.map((eleccion) => {
          return(
            <tr className="trVerEleccion" key={eleccion.COD_ELECCION}>
                <td className="especialtd">{eleccion.MOTIVO_ELECCION}</td>
                <td className="tdNormal">{eleccion.FECHA_ELECCION}</td>
                <td className="tdNormal">
                      <button className ="custom-btn btn-4" onClick={() => handleDetallesClick(eleccion.COD_ELECCION)}>
                             Detalles de la Elección
                      </button>
                
                </td>
                <td className="tdNormal">
                      <button className="custom-btn btn-5" onClick={() => handleConvocatoriaClick(eleccion.COD_ELECCION)}>
                            Convocatoria
                      </button>
                </td>
           </tr>
          )
          
        })}
        
      </tbody>
    </table>
    </div>
  );
};

export default VerElecciones;
