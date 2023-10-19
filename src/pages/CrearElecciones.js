import React, { useState } from "react";
import "../css/MenuVertical.css";
import Modal from "./Modal";
import axios from "axios";

const CrearElecciones = () => {

    const initialState = {
      nuevoTipoEleccion: "",
      motivoEleccion: "",
      motivoPersonalizado: "",
      fechaInicio: "",
      fechaFin: "",
      fechaElecciones: "",
    } 
  
    const [formData, setFormData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
  
    const url = "http://localhost:8000/";
    const handleNuevoTipoEleccionChange = (e) => {
      const nuevoTipoEleccion = e.target.value;
      let motivoEleccion = "";
      let motivoPersonalizado = "";
  
      if (nuevoTipoEleccion === "No") {
        // Si elige "No", limpiamos los valores de motivo y motivoPersonalizado
        motivoEleccion = "";
        motivoPersonalizado = "";
      }
  
      setFormData({
        ...formData,
        nuevoTipoEleccion,
        motivoEleccion,
        motivoPersonalizado,
      });
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleGuardarClick = () => {
     console.log(formData.motivoEleccion)
      if (!formData.motivoEleccion || !formData.fechaInicio || !formData.fechaFin || !formData.fechaElecciones) {
        setModalMessage("Por favor, complete todos los campos.");
        setShowModal(true);
        return;
      }
  
      if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio) || new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)) {
        setModalMessage("Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin.");
        setShowModal(true);
        return;
      }
  
      const nuevoProceso = {
        COD_ADMIN: "", // Reemplaza con el código de administrador adecuado
        COD_FRENTE: 0, // Reemplaza con el código de frente adecuado
        COD_TEU: 0, // Reemplaza con el código de TEU adecuado
        COD_COMITE: 0, // Reemplaza con el código de comité adecuado
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_ELECCION: formData.fechaElecciones,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        ELECCION_ACTIVA: true
      };
  
      axios.post(url + "elecciones_data", nuevoProceso)
        .then((response) => {
          console.log("El proceso se registro correctamente");
          setModalMessage(`El proceso electoral se ha creado con éxito para el motivo: ${formData.motivoEleccion}`);
          setShowModal(true);
          setFormData(initialState);
        })
        .catch((error) => {
          console.error("Error al crear el proceso electoral:", error);
        });
    };
  return (
    <div className="crear-elecciones">
      <h3>Nuevo proceso electoral</h3>
      <div className="form-group">
        <label>¿Quiere iniciar un nuevo tipo de elección?</label>
        <select
          name="nuevoTipoEleccion"
          value={formData.nuevoTipoEleccion}
          onChange={handleNuevoTipoEleccionChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      {formData.nuevoTipoEleccion === "Si" && (
        <div className="form-group">
          <label>Motivo:</label>
          <input
            type="text"
            name="motivoEleccion"
            value={formData.motivoEleccion}
            onChange={handleInputChange}
            placeholder="Ingrese el motivo"
            className="motivo-input"
          />
        </div>
      )}
      {formData.nuevoTipoEleccion === "No" && (
        <div className="form-group">
          <label>Motivo:</label>
          <select
            name="motivoEleccion"
            value={formData.motivoEleccion}
            onChange={handleInputChange}
            className="motivo-input"
          >
            <option value="">Seleccione una opción</option>
            <option value="Rector">Rector, Vicerrector</option>
            <option value="Decano">Decano, Director Académico</option>
            <option value="Director de carrera">Director de carrera</option>
            <option value="Consejo de Facultad">Consejeros de Facultad</option>
            <option value="Consejo de carrera">Consejeros de carrera</option>
            <option value="Congreso nacional">
              Congreso nacional de universidades (Delegados docentes y
              estudiantes)
            </option>
            <option value="Conferencias de facultad">
              Conferencias de facultad (Delegados docentes y estudiantes)
            </option>
            <option value="Consejo universitario">
              Honorable consejo universitario (Delegados docentes y estudiantes)
            </option>
            <option value="Congreso universitario">
              Congreso universitario (Delegados docentes y estudiantes)
            </option>
          </select>
        </div>
      )}
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
      <button className="volver-button">Volver</button>
      <button className="guardar-button" onClick={handleGuardarClick}>
        Guardar
      </button>
      {showModal && (
        <Modal mensaje={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CrearElecciones;