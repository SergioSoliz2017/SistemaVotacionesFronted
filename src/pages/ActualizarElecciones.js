import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


const ActualizarEleccion = () => {
    const { id } = useParams();
  const initialState = {
    motivoEleccion: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  

  const navigate = useNavigate(); // Inicializa useNavigate

  const [formData, setFormData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const url = "http://localhost:8000/";

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de la elección con el ID proporcionado
    axios
      .get(url + `obtener_id/${id}`)
      .then((response) => {
        const eleccion = response.data;
        setFormData({
          motivoEleccion: eleccion.MOTIVO_ELECCION,
          fechaInicio: eleccion.FECHA_INI_CONVOCATORIA,
          fechaFin: eleccion.FECHA_FIN_CONVOCATORIA,
          fechaElecciones: eleccion.FECHA_ELECCION,
        });
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la elección:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
  
    console.log(id);

    axios
      .put(url + `eleccionesUpdate/${id}`, {
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        FECHA_ELECCION: formData.fechaElecciones,
      })
      .then((response) => {
        setModalMessage("Proceso electoral actualizado correctamente.");
        //setShowModal(true);
      })
      .catch((error) => {
        console.error("Error al actualizar el proceso electoral:", error);
      });
  };

  const handleVolverAtras = () => {
    navigate('/home'); // Reemplaza '/otraRuta' con la URL de la página a la que deseas redirigir
  };

  return (
    <div className="crear-elecciones">
      <h3>Actualizar proceso electoral</h3>
      <div className="form-group">
        <label>Motivo de Elección:</label>
        <input
          type="text"
          name="motivoEleccion"
          value={formData.motivoEleccion}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha inicio de convocatoria:</label>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha fin de convocatoria:</label>
        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          min={formData.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fecha de las elecciones:</label>
        <input
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          min={formData.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <button className="volver-button" onClick={handleVolverAtras}>Volver</button>
      <button className="guardar-button" onClick={handleActualizarClick}>
        Actualizar
      </button>
     
    </div>
  );
};

export default ActualizarEleccion;
