import React from 'react';
import '../css/MenuVertical.css';

const Modal = ({ onClose, mensaje }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Mensaje del proceso electoral</h3>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <p>{mensaje}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;