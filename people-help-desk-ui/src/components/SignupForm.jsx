import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhoneNo, setSignupPhoneNo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form fields
    if (!signupName || !signupEmail || !signupPassword || !signupPhoneNo) {
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      alert('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(signupPhoneNo.replace(/[^0-9]/g, ''))) {
      alert('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }
    
    // Simulate API call with mock success
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signup
      console.log('Signup successful:', {
        name: signupName,
        email: signupEmail,
        phone: signupPhoneNo
      });
      
      // Show success message
      alert('Signup successful! Your account has been created. Please login with your credentials.');
      
      // Clear form fields
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupPhoneNo('');
      
      // Redirect to login page after successful signup
      navigate('/login');
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel/close
  const handleCancel = () => {
    if (!loading) {
      // Navigate back to home page
      navigate('/');
    }
  };

  return (
    <div id="signupForm" className="signup-form-container">
      <div className="form-header">
        <h2>Sign Up</h2>
        <button className="close-button" onClick={handleCancel} disabled={loading} aria-label="Close form">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="signupName">Name:</label>
        <input
          type="text"
          id="signupName"
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
          required
          disabled={loading}
        />
        <label htmlFor="signupEmail">Email:</label>
        <input
          type="email"
          id="signupEmail"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
          disabled={loading}
        />
        <label htmlFor="signupPassword">Password:</label>
        <input
          type="password"
          id="signupPassword"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
          disabled={loading}
        />
        <label htmlFor="signupPhoneNo">Phone No:</label>
        <input
          type="tel"
          id="signupPhoneNo"
          value={signupPhoneNo}
          onChange={(e) => setSignupPhoneNo(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
