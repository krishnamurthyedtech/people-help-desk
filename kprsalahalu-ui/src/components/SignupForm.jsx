import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SignupForm = ({ setShowSignupForm }) => {
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhoneNo, setSignupPhoneNo] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phoneno: signupPhoneNo,
      });
      const message = response.data.message || 'Signup successful';
      alert(message);
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupPhoneNo('');
      setShowSignupForm(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div id="signupForm" className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="signupName">Name:</label>
        <input
          type="text"
          id="signupName"
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
          required
        />
        <label htmlFor="signupEmail">Email:</label>
        <input
          type="email"
          id="signupEmail"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
        />
        <label htmlFor="signupPassword">Password:</label>
        <input
          type="password"
          id="signupPassword"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
        />
        <label htmlFor="signupPhoneNo">Phone No:</label>
        <input
          type="tel"
          id="signupPhoneNo"
          value={signupPhoneNo}
          onChange={(e) => setSignupPhoneNo(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <button className="close-button" onClick={() => setShowSignupForm(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
