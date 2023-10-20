import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ActualizacionEleccionModal.css"

Modal.setAppElement("#root");

const ActualizarEleccionModal = ({ isOpen, closeModal, eleccionId }) => {
  const { id } = useParams();
  const initialState = {
    motivoEleccion: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [modalMessage, setModalMessage] = useState("");
  const[modalIsOpen, setModalIsOpen] = useState(false);
  const url = "http://localhost:8000/";
  console.log(url + `obtener_id/${eleccionId}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `obtener_id/${eleccionId}`);
        const eleccion = response.data;
        setFormData({
          motivoEleccion: eleccion.MOTIVO_ELECCION,
          fechaInicio: eleccion.FECHA_INI_CONVOCATORIA,
          fechaFin: eleccion.FECHA_FIN_CONVOCATORIA,
          fechaElecciones: eleccion.FECHA_ELECCION,
        });
      } catch (error) {
        console.error("Error al obtener los datos de la elección:", error);
      }
    };

    fetchData();
  }, [eleccionId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
    axios
      .put(url + `eleccionesUpdate/${eleccionId}`, {
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        FECHA_ELECCION: formData.fechaElecciones,
      })
      .then((response) => {
        
        closeModal();
        setModalIsOpen(true);
        // Puedes mostrar un mensaje de éxito aquí si lo deseas.
      })
      .catch((error) => {
        console.error("Error al actualizar el proceso electoral:", error);
      });
  };

  const handleVolverAtras = () => {
    closeModal();
    navigate("/home");
  };
  const cerrarModal= () => {
    setModalIsOpen(false);
  };
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      cerrarModal();
    }
  };
  return (
    <>
     <Modal
    className={"Cuerpo"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Actualizar Elección"
    >
      <h3 className="ActualizarTitulo">Actualizar proceso electoral</h3>
      <div className="form-group">
        <label className="LabelCrearActualizar">Motivo de Elección:</label>
        <input
          className="InputCrearActualizar"
          type="text"
          name="motivoEleccion"
          value={formData.motivoEleccion}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha inicio de convocatoria:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha fin de convocatoria:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          min={formData.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha de las elecciones:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          min={formData.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <div className="BotonesDivCrearActualizar">
      <button className ="custom-btn btn-9" onClick={handleActualizarClick}>
        Actualizar
      </button>
      <button className ="custom-btn btn-8" onClick={handleVolverAtras}>
        Volver
      </button>
      </div>
    </Modal>
    <Modal  
        className={"ActualizarModal"}
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal}
        contentLabel="Modal de actualizacion"
        onClick={handleModalClick}>
          
                  <div class="modal-content">
                    <div class="modal-header">
                      <div className="ContenedorTituloMo">
                      <h5 class="modal-title">Confirmacion de actualizacion</h5>
                      </div>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cerrarModal}></button>
                    </div>
                    <div class="modal-body">
                      <p className="LetraActualizacionConf">Se actualizo correctamente el proceso !</p>
                    </div>
                    
                  </div>
            
      </Modal>  
    </>
   
  );
};

export default ActualizarEleccionModal;