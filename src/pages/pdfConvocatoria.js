import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Importa Modal desde react-modal
import "../css/Convocatoria.css"
Modal.setAppElement('#root'); // Configura la aplicación para react-modal

const PdfConvocatoria = ({ isOpen, closeModal, eleccionId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eleccion, setEleccion] = useState({});
  const [descripcion, setDescripcion] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal

  useEffect(() => {
    const obtenerDetallesEleccion = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/obtener_id/${eleccionId}`);
        setEleccion(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la elección:', error);
      }
    };

    obtenerDetallesEleccion();
  }, [eleccionId]);

  const handleGenerarPDF = () => {
    const doc = new jsPDF();
    doc.text('Detalles de la Elección', 10, 10);
    doc.text(`Motivo de Elección: ${eleccion.MOTIVO_ELECCION}`, 10, 30);
    doc.text(`Fecha de Elección: ${eleccion.FECHA_ELECCION}`, 10, 40);
    doc.text(`Descripción: ${descripcion}`, 10, 50);
    doc.save('Detalles_Eleccion.pdf');
    closeModal();
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleAtras = () => {
    closeModal();
    navigate("/home");
  };


  return (
    

      <Modal
      className={"CuerpoConvocatoria"}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Generando PDF"
      >
        
      <h2 className="ConvocatoriaTitulo">Detalles de la Elección</h2>
      <div className='ContenedorConvocatoriaTexto'>
      <p className="LabelCrearConvocatoria">Motivo de Elección: </p>
      <p className="NormalConvocatoria">{eleccion.MOTIVO_ELECCION}</p>
      </div>
      <div className='ContenedorConvocatoriaTexto'>
      <p className="LabelCrearConvocatoria">Fecha de Elección: </p>
      <p className="NormalConvocatoria">{eleccion.FECHA_ELECCION}</p>
      
      </div>
      <div>
        <label className="LabelCrearConvocatoria">Descripción:</label>
        <textarea
        className='TextConvocatoria'
          rows="4"
          cols="50"
          value={descripcion}
          onChange={handleDescripcionChange}
        ></textarea>
      </div>
      <div className='BotonesDivCrearConvocatoria'>
      <button className ="custom-btn btn-10"onClick={handleGenerarPDF}>Generar PDF</button>
        <button className ="custom-btn btn-11"onClick={handleAtras}>Cerrar</button>
        </div> 
      </Modal>
    
  );
};

export default PdfConvocatoria;