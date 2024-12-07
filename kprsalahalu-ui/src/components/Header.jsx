import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Header = ({
  isAuthenticated,
  onLogin,
  onLogout,
  showLoginForm,
  setShowLoginForm,
  showSignupForm,
  setShowSignupForm,
  setSelectedCategory

}) => {
  return (
    <>
      {showLoginForm ? (
        <LoginForm onLogin={onLogin} setShowLoginForm={setShowLoginForm} />
      ) : showSignupForm ? (
        <SignupForm setShowSignupForm={setShowSignupForm} />
      ) : (
        <>
          <header>
            <div className="contact-info">
              <span>📱 +91-8123870076   📧 contactus@poincareconsultants.com </span>
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
                      }}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowSignupForm(true);
                        setShowLoginForm(false);
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
                <li><Link to="/" onClick={() => setSelectedCategory('HOME')}>Home</Link></li>
                <li><Link to="/" onClick={() => setSelectedCategory('LAW')}>Law</Link></li>
                <li><Link to="/" onClick={() => setSelectedCategory('FINANCE')}>Finance</Link></li>
                <li><Link to="/" onClick={() => setSelectedCategory('EDUCATION')}>Education</Link></li>
                <li><Link to="/" onClick={() => setSelectedCategory('LAND')}>Land</Link></li>
                <li><Link to="/" onClick={() => setSelectedCategory('HEALTH')}>Health</Link></li>
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
