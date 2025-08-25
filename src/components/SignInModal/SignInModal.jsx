import React, { useState } from 'react';
import './SignInModal.css';

function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle sign in logic here
      console.log('Sign in:', formData);
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__container modal__container_type_signin">
        <button 
          className="modal__close-button" 
          type="button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <h2 className="modal__title">Sign in</h2>
        
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-container">
            <label className="modal__label">Email</label>
            <input
              className={`modal__input ${errors.email ? 'modal__input_type_error' : ''}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
            {errors.email && <span className="modal__error">{errors.email}</span>}
          </div>
          
          <div className="modal__input-container">
            <label className="modal__label">Password</label>
            <input
              className={`modal__input ${errors.password ? 'modal__input_type_error' : ''}`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
            {errors.password && <span className="modal__error">{errors.password}</span>}
          </div>
          
          <button className="modal__submit-button" type="submit">
            Sign in
          </button>
        </form>
        
        <p className="modal__switch-text">
          or{' '}
          <button 
            className="modal__switch-button" 
            type="button" 
            onClick={onSwitchToSignUp}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInModal;
