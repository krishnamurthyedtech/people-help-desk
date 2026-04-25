import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  isAuthenticated,
  onLogin,
  onLogout,
  setSelectedCategory

}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleNavClick = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header-top-bar">
        {/* Left: Contact Info */}
        <div className="contact-info">
          <span>📱 +91-8123870076</span>
          <span>📧 contactus@poincareconsultants.com</span>
        </div>

        {/* Right: Navigation + Auth */}
        <div className="nav-auth-wrapper">
          {/* Navigation Menu */}
          <nav className="header-nav">
            <ul>
              <li><Link to="/" onClick={() => handleNavClick('HOME')}>Home</Link></li>
              <li><Link to="/" onClick={() => handleNavClick('LAW')}>Law</Link></li>
              <li><Link to="/" onClick={() => handleNavClick('FINANCE')}>Finance</Link></li>
              <li><Link to="/" onClick={() => handleNavClick('EDUCATION')}>Education</Link></li>
              <li><Link to="/" onClick={() => handleNavClick('LAND')}>Land</Link></li>
              <li><Link to="/" onClick={() => handleNavClick('HEALTH')}>Health</Link></li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="login-signup">
            <Link to="/help" className="btn-help">
              Help
            </Link>
            {isAuthenticated ? (
              <>
                <button onClick={onLogout}>Logout</button>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: 'white' }} />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="wrapper">
        <div className="logo-title">
          <h1>People Help Desk</h1>
        </div>
      </div>
      <hr className="divider-color" />
          </>
  );
};

export default Header;
