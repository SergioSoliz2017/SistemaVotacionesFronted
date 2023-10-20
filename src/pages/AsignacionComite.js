import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";

function AsignacionComite({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [existeComite, setExisteComite] = useState(false); // Estado para verificar la existencia del comité
  const url = "http://localhost:8000/";
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setproceso(response.data)
    })
  }, [lista]);


  // Función para verificar la existencia del comité
  const verificarExistenciaComite = (codComite) => {
    // Realiza una solicitud GET al servidor de Laravel para verificar la existencia del comité
    axios
      .get(`http://localhost:8000/verificar-comite/${codComite}`)
      .then((response) => {
        
        // La respuesta debe ser un objeto JSON con el campo "existeComite"
        if (response.data.existeComite) {
          // Si el comité no existe, establece setExisteComite en true
          setExisteComite(true);
          console.log("El comité no existe");
        } else {
          // Si el comité existe, puedes realizar otras acciones aquí
          setExisteComite(false);
          console.log("El comité existe");
        }
      })
      .catch((error) => {
        console.error("Error al verificar la existencia del comité:", error);
      });
  };

  
  const handleAsociarClick = (COD_ELECCION, COD_COMITE) => {
    // Antes de asociar el comité, verifica si existe
    verificarExistenciaComite(COD_COMITE);

    
  
    // Realiza la asignación solo si el comité existe
    if (!existeComite) {
      console.log(!existeComite)
      //elecciones/asignar_comite/  AQUI CAMBIAR RUTA----------------ruta asi cambiar
      // Realizar una solicitud PUT para asociar el comité a la elección
      axios
        .put(`http://localhost:8000/asignar-comite/${COD_ELECCION}`)
        .then((responseComite) => {
          console.log("Asignación de comité exitosa:", responseComite.data);

          // Luego, realizar una solicitud POST para asignar vocales al comité
          axios
            .post(`http://localhost:8000/asignar-vocales/${COD_COMITE}`)
            .then((responseVocales) => {
              console.log("Asignación de vocales exitosa:", responseVocales.data);
              setCodComite(COD_COMITE);
              setModalIsOpen(true);
            })
            .catch((errorVocales) => {
              console.error("Error en la asignación de vocales:", errorVocales);
            });
        })
        .catch((errorComite) => {
          console.error("Error en la asignación de comité:", errorComite);
        });
    } else {
      // Puedes mostrar un mensaje de error o tomar otras medidas si el comité no existe
      console.log("No se puede asignar el comité porque no existe");
    }
  };

  const handleVerListaClick = (eleccionId) => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="divComite">
      <h1 className="titleC"> Comite Electoral </h1>
      <div>
        <table className="TablaComite">
          <thead className="headerComite">
            <tr>
              <th> ID </th>
              <th> NAME </th>
              <th> ACCIONES </th>
            </tr>
          </thead>
          <tbody className="BodyComite">
            {proceso.map((elemento) => (
              <tr key={elemento.COD_ELECCION}>
                <td>{elemento.COD_ELECCION}</td>
                <td>{elemento.MOTIVO_ELECCION}</td>
                <td>
                  <button
                    className="botonComite1"
                    class="custom-btn btn-2"
                    onClick={() =>
                      handleAsociarClick(elemento.COD_ELECCION, elemento.COD_COMITE)
                    }
                  >
                    Asignar
                  </button>{" "}
                  <button class="custom-btn btn-3" onClick={() => handleVerListaClick(elemento.COD_COMITE)}>Ver Lista</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo de Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
        onClick={handleModalClick} // Cierra el modal al hacer clic fuera de él
      >
        <h2 className="H2Comite">Lista de Comite Electoral</h2>
        {codComite !== null && <ListaVocalesComite idComite={codComite} />}

        <button
          className="BotonComiteModal"
          class="custom-btn btn-1"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
}

export default AsignacionComite;