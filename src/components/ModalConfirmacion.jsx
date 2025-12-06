import React from 'react';

function ModalConfirmacion({ isOpen, onConfirm, onCancel, mensaje }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmar Acción</h3>
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-eliminar">
            Confirmar
          </button>
          <button onClick={onCancel} className="btn-secundario">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;