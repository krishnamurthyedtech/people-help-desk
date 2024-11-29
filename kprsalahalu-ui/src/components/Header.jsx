
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  isAuthenticated,
  onLogin,
  onLogout,
  showLoginForm,
  setShowLoginForm,
  showSignupForm,
  setShowSignupForm,
}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhoneNo, setSignupPhoneNo] = useState('');

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
    <>
      {showLoginForm ? (
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
            <button className="close-button" onClick={()=>setShowLoginForm(false)}><FontAwesomeIcon icon={faXmark} /></button>
          </form>
        </div>
      ) : showSignupForm ? (
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
            <button className="close-button" onClick={()=> setShowSignupForm(false)}><FontAwesomeIcon icon={faXmark} /></button>
          </form>
        </div>
      ) : (
        <>
          <header>
            <div className="contact-info">
              {/* <span>📱 +91-8123870076   📧 contactus@poincareconsultants.com </span> */}
              <span>📱 +91-8123870076</span> 
              <span>📧 contactus@poincareconsultants.com</span>
              <div className="login-signup">
                {isAuthenticated ? (
                  <>
                    <button onClick={onLogout}>Logout</button>
                    <Link to="/dashboard">
                      <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: 'white' }} />
                    </Link>
                  </>
                ) : (
                  <>
                    
                    <button
                      onClick={() => {
                        setShowLoginForm(true);
                        setShowSignupForm(false);
                        setSignupName('');
                        setSignupEmail('');
                        setSignupPassword('');
                        setSignupPhoneNo('');
                      }}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowSignupForm(true);
                        setShowLoginForm(false);
                        setLoginEmail('');
                        setLoginPassword('');
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}      
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
        </>
      )}
    </>
  );
};

export default Header;
