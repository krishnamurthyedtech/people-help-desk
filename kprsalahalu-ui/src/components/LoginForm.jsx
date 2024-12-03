import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, setShowLoginForm }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(response.data);
      const userData = response.data.data;
      sessionStorage.setItem("userDetails", JSON.stringify(userData));
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    }
  };

  return (
    <div id="loginForm" className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="loginEmail">Email:</label>
        <input
          type="email"
          id="loginEmail"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button className="close-button" onClick={() => setShowLoginForm(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
