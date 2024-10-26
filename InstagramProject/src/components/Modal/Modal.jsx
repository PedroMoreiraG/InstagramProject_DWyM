/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizamos nada

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;