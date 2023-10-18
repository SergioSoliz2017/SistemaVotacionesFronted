import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";

function AsignacionComite() {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [codComite, setCodComite] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de elecciones
    axios
      .get("http://localhost:8000/obtenerProcesosElectorales")
      .then((response) => {
        setproceso(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de elecciones:", error);
      });
  }, []);

  const handleAsociarClick = (COD_ELECCION, COD_COMITE) => {
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
              <tr key={elemento.CODPROCESOELECTORAL}>
                <td>{elemento.CODPROCESOELECTORAL}</td>
                <td>{elemento.CARGO}</td>
                <td>
                  <button
                    className="botonComite1"
                    class="custom-btn btn-2"
                    onClick={() =>
                      handleAsociarClick(elemento.CODELECCION, elemento.CODCOMITE)
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