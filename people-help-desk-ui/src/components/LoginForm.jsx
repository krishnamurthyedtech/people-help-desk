import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  }, [errors, loginError]);

  // Handle field blur
  const handleFieldBlur = useCallback((field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = Object.keys(formData);
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    // Clear previous login error
    setLoginError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      
      const userData = response.data.data;
      sessionStorage.setItem("userDetails", JSON.stringify(userData));
      
      // Show success message
      setLoginError('');
      
      // Call onLogin callback
      onLogin();
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setLoginError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onLogin, navigate]);

  
  // Handle cancel
  const handleCancel = useCallback(() => {
    if (!isSubmitting) {
      // Navigate back to home page
      navigate('/');
    }
  }, [isSubmitting, navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Get field error message
  const getFieldError = (field) => {
    return touched[field] ? errors[field] : '';
  };

  // Check if field has error
  const hasFieldError = (field) => {
    return touched[field] && !!errors[field];
  };

  return (
    <div className="login-form-container">
      <div className="form-header">
        <h2>Login</h2>
        <button className="close-button" onClick={handleCancel} disabled={isSubmitting} aria-label="Close form">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Login error message */}
      {loginError && (
        <div className="login-error-message">
          <FontAwesomeIcon icon={faXmark} />
          <span>{loginError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="loginEmail" className={hasFieldError('email') ? 'error' : ''}>
            Email Address <span className="required">*</span>
          </label>
          <input
            id="loginEmail"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            className={hasFieldError('email') ? 'error' : ''}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
            aria-required="true"
            aria-describedby={getFieldError('email') ? 'email-error' : undefined}
            autoComplete="email"
          />
          {getFieldError('email') && (
            <span id="email-error" className="error-message">
              {getFieldError('email')}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label htmlFor="loginPassword" className={hasFieldError('password') ? 'error' : ''}>
            Password <span className="required">*</span>
          </label>
          <div className="password-input-container">
            <input
              id="loginPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={() => handleFieldBlur('password')}
              className={hasFieldError('password') ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={getFieldError('password') ? 'password-error' : undefined}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              disabled={isSubmitting}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {getFieldError('password') && (
            <span id="password-error" className="error-message">
              {getFieldError('password')}
            </span>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="forgot-password-link">
          <a href="#forgot-password" onClick={(e) => {
            e.preventDefault();
            // TODO: Implement forgot password functionality
            alert('Forgot password functionality coming soon!');
          }}>
            Forgot your password?
          </a>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

          </div>
  );
};

export default LoginForm;
