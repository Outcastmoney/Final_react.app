import React from 'react';
import './SuccessModal.css';

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="success-modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img
            src="/src/images/close.png"
            alt="close"
            className="modal__close-icon"
          />
        </button>
        <div className="success-modal__body">
          <h2 className="success-modal__title">Registration successfully completed!</h2>
          <button 
            type="button"
            className="success-modal__button"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
