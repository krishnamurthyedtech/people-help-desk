import React, { useState } from 'react';
import AxiosInstance from './AxiosInstance';
// import logo from '../img/pc-logo.png'; // Adjust the path as necessary

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [data, setData] = useState();

 

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const loginObject = {
    email: email,
    password: password,
   }

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

  const openSignupForm = () => setShowSignupForm(true);
  const closeSignupForm = () => setShowSignupForm(false);

  const login = async() => {
    console.log("Data",loginObject);
    try{
      const response = await AxiosInstance.post('/login',loginObject);
      return response.data; 
    }catch(error){
      throw error;
    }
  
  };

  const signup = () => {
    // Add your signup logic here
    alert('Signup logic goes here');
  };

  return (
    <>
      <header>
        <div className="contact-info">
          <span>📱 +91-8123870076 📧 contactus@poincareconsultants.com</span>
          <div className="login-signup">
            <button onClick={openLoginForm}>Login</button>
            <button onClick={openSignupForm}>Sign Up</button>
            <span className="usa">USA</span>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <div className="logo-title">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          <h1>KPR Salahalu</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">Law</a></li>
            <li><a href="#">Finance</a></li>
            <li><a href="#">Education</a></li>
            <li><a href="#">Land</a></li>
            <li><a href="#">Health</a></li>
          </ul>
        </nav>
      </div>
      <hr className="divider-color" />

      {showLoginForm && (
        <div id="loginForm" className="form-container">
          <h2>Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <label htmlFor="loginEmail">Email:</label>
            <input type="email" id="loginEmail" name="loginEmail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="loginPassword" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            <button type="button" onClick={closeLoginForm}>Close</button>
          </form>
        </div>
      )}

      {showSignupForm && (
        <div id="signupForm" className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={(e) => { e.preventDefault(); signup(); }}>
            <label htmlFor="signupName">Name:</label>
            <input type="text" id="signupName" name="signupName" required />
            <label htmlFor="signupEmail">Email:</label>
            <input type="email" id="signupEmail" name="signupEmail" required />
            <label htmlFor="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required />
            <button type="submit">Sign Up</button>
            <button type="button" onClick={closeSignupForm}>Close</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
