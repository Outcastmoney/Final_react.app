import { useState, useEffect, useCallback } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { register } from '../../utils/auth';
import './SignUpModal.css';

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateUsername = (username) => {
    if (!username) {
      setUsernameError('Username is required');
      return false;
    } else if (username.length < 2) {
      setUsernameError('Username must be at least 2 characters');
      return false;
    }
    setUsernameError('');
    return true;
  };
  
  const validateForm = useCallback(() => {
    const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password && password.length >= 6;
    const isUsernameValid = username && username.length >= 2;
    setIsFormValid(isEmailValid && isPasswordValid && isUsernameValid);
    return isEmailValid && isPasswordValid && isUsernameValid;
  }, [email, password, username]);

  useEffect(() => {
    if (isOpen) {
      validateForm();
    } else {
      setEmail('');
      setPassword('');
      setUsername('');
      setEmailError('');
      setPasswordError('');
      setUsernameError('');
      setEmailTouched(false);
      setPasswordTouched(false);
      setUsernameTouched(false);
      setError('');
    }
  }, [isOpen, validateForm]);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    }
  }, [email, password, username, isOpen, validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up form submitted');
    console.log('Form values:', { email, password, username });
    console.log('Form valid:', isFormValid);
    
    setEmailTouched(true);
    setPasswordTouched(true);
    setUsernameTouched(true);
    
    const formIsValid = validateForm();
    console.log('Validation result:', formIsValid);
    
    if (!formIsValid) {
      console.log('Form validation failed');
      return;
    }
    
    setIsLoading(true);
    setError('');

    register(email, password, username)
      .then((data) => {
        console.log('Sign up successful:', data);
        setEmail('');
        setPassword('');
        setUsername('');
        setError('');
        onClose();
        // Show success modal after successful registration
        onSuccess();
      })
      .catch((err) => {
        console.error('Registration error:', err);
        if (err.message) {
          setError(err.message);
        } else {
          setError('Registration failed. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      buttonTextAlt="Sign in"
      onButtonClick={onSwitchToSignIn}
      disabled={isLoading || !isFormValid}
      showDefaultButtons={true}
    >
      <label className="login-modal__label">
        <p className="login-modal__input-title">Email</p>
        <input
          className={`login-modal__input ${emailTouched && emailError ? 'login-modal__input_error' : ''}`}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            setEmailTouched(true);
            validateEmail(email);
          }}
          placeholder="Email"
          required
        />
        {emailTouched && emailError && <p className="login-modal__input-error">{emailError}</p>}
      </label>
      <label className="login-modal__label">
        <p className="login-modal__input-title">Password</p>
        <input
          className={`login-modal__input ${passwordTouched && passwordError ? 'login-modal__input_error' : ''}`}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            setPasswordTouched(true);
            validatePassword(password);
          }}
          placeholder="Password"
          required
        />
        {passwordTouched && passwordError && <p className="login-modal__input-error">{passwordError}</p>}
      </label>
      <label className="login-modal__label">
        <p className="login-modal__input-title">Username</p>
        <input
          className={`login-modal__input ${usernameTouched && usernameError ? 'login-modal__input_error' : ''}`}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => {
            setUsernameTouched(true);
            validateUsername(username);
          }}
          placeholder="Username"
          required
        />
        {usernameTouched && usernameError && <p className="login-modal__input-error">{usernameError}</p>}
      </label>
      {error && <p className="login-modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default SignUpModal;
