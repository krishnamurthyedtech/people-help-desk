import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 

const Header = ({ isAuthenticated, onLogin, onLogout }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhoneNo, setSignupPhoneNo] = useState('');

  const navigate = useNavigate();

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

  const openSignupForm = () => setShowSignupForm(true);
  const closeSignupForm = () => setShowSignupForm(false);

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
  
      alert('Login successful');
      onLogin(); 
      closeLoginForm();
      navigate('/dashboard'); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    }
  };
  
  

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
      closeSignupForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      alert(errorMessage);
    }
  };
  

  return (
    <>
      <header>
        <div className="contact-info">
          <span>📱 +91-8123870076 📧 contactus@poincareconsultants.com</span>
          <div className="login-signup">
            {isAuthenticated ? (
              <>
                <button onClick={onLogout}>Logout</button>
                <Link to="/dashboard">
                  <FontAwesomeIcon 
                    icon={faUserCircle} 
                    size="2x" 
                    style={{ color: 'white' }} 
                  />
                </Link>
              </>
            ) : (
              <>
                <button onClick={openLoginForm}>Login</button>
                <button onClick={openSignupForm}>Sign Up</button>
              </>
            )}
            <span className="usa">USA</span>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <div className="logo-title">
          <h1>KPR Salahalu</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="#">Law</Link></li>
            <li><Link to="#">Finance</Link></li>
            <li><Link to="#">Education</Link></li>
            <li><Link to="#">Land</Link></li>
            <li><Link to="#">Health</Link></li>
          </ul>
        </nav>
      </div>
      <hr className="divider-color" />

      {showLoginForm && (
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
            <button type="button" onClick={closeLoginForm}>Close</button>
          </form>
        </div>
      )}

      {showSignupForm && (
        <div id="signupForm" className="form-container">
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
            <button type="button" onClick={closeSignupForm}>Close</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
