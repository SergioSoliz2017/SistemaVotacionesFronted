import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams desde React Router
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const PdfConvocatoria = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la URL
  const [eleccion, setEleccion] = useState({});
  const [descripcion, setDescripcion] = useState('');

  // Obtener los detalles de la elección desde la API al cargar el componente
  useEffect(() => {
    const obtenerDetallesEleccion = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/obtener_id/${id}`); // Reemplaza 'API_ENDPOINT' con tu URL de la API
        setEleccion(response.data); // Asigna los datos de la elección a 'eleccion'
      } catch (error) {
        console.error('Error al obtener los detalles de la elección:', error);
      }
    };

    obtenerDetallesEleccion();
  }, [id]);

  const handleGenerarPDF = () => {
    const doc = new jsPDF();
    doc.text('Detalles de la Elección', 10, 10);
    doc.text(`Motivo de Elección: ${eleccion.MOTIVO_ELECCION}`, 10, 30);
    doc.text(`Fecha de Elección: ${eleccion.FECHA_ELECCION}`, 10, 40);
    doc.text(`Descripción: ${descripcion}`, 10, 50);
    doc.save('Detalles_Eleccion.pdf');
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };
  const handleAtras = (e) => {
    navigate(`/home`);
  };

  return (
    <div className="crear-elecciones">
      <h2>Detalles de la Elección</h2>
      <p>Motivo de Elección: {eleccion.MOTIVO_ELECCION}</p>
      <p>Fecha de Elección: {eleccion.FECHA_ELECCION}</p>
      <div>
        <label>Descripción:</label>
        <textarea
          rows="4"
          cols="50"
          value={descripcion}
          onChange={handleDescripcionChange}
        ></textarea>
      </div>
      <button onClick={handleGenerarPDF}>Generar PDF</button>
      <button onClick={handleAtras}>Atras</button>
    </div>
  );
};

export default PdfConvocatoria;
