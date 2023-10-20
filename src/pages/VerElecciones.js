import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones2.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ActualizarEleccionModal from "../pages/ActualizarEleccionModal";
import PdfConvocatoria from "./pdfConvocatoria";
const VerElecciones = ({ lista }) => {
  //const numRows = 4; // Número de filas
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false); // Nuevo estado para controlar el modal
  const [modalConvo, setModalConvo] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null); // Nuevo estado para almacenar el ID de la elección seleccionada
  const url = "http://localhost:8000/";

  const [listaElecciones,setListaElecciones] = useState([])

  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  const handleDetallesClick = (id) => {
    // Al hacer clic en "Detalles de la Elección," establece el ID de la elección seleccionada y abre el modal.
    setSelectedEleccionId(id);
    console.log(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalIsOpen(false);
    setSelectedEleccionId(null);
  };
  const closeModal1 = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalConvo(false);
    setSelectedEleccionId(null);
  };

  const handleConvocatoriaClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    setSelectedEleccionId(id);
    console.log(id);
    setModalConvo(true);
  };
  return (
    <>
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
    <ActualizarEleccionModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        eleccionId={selectedEleccionId} // Pasa el ID seleccionado al modal
      />
      <PdfConvocatoria
          isOpen={modalConvo}
          closeModal={closeModal1}
          eleccionId={selectedEleccionId}
      />
    </>
    
  );
};

export default VerElecciones;
