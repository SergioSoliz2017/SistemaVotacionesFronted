import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  "../css/Asignacion.css"


function ListaVocalesComite({ idComite }) {
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de titulares y suplentes
    axios.get(`http://localhost:8000/ver-lista-comite/${idComite}`)
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        setTitulares(data.titulares);
        setSuplentes(data.suplentes);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, [idComite]);
  
  return (
    <div>
      <div>
        <h3 className='H3LISTA'>Titulares:</h3>
        <ul>
          {titulares.map((titular) => (
            <li key={titular.CARNETIDENTIDAD}>
              <div className="vocal-item">
                <span className="vocal-name">{`${titular.NOMBRE} ${titular.APELLIDO}`}</span>
                
                <span className="vocal-ci">CI: {titular.CARNETIDENTIDAD}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className='H3LISTA'>Suplentes:</h3>
        <ul>
          {suplentes.map((suplente) => (
            <li key={suplente.CARNETIDENTIDAD}>
              <div className="vocal-item">
                <span className="vocal-name">{`${suplente.NOMBRE} ${suplente.APELLIDO}`}</span>
                <span className="vocal-ci">CI: {suplente.CARNETIDENTIDAD}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
}

export default ListaVocalesComite;
