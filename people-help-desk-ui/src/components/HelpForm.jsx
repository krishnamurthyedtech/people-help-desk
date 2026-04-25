import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HelpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    subject: '',
    inquiryType: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.inquiryType || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare payload
      const payload = {
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        inquiryType: formData.inquiryType,
        description: formData.description.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('Help request submitted:', payload);

      // Show success message
      alert('Help request submitted successfully. We will contact you soon!');
      
      // Reset form after submission
      setFormData({
        phone: '',
        subject: '',
        inquiryType: '',
        description: ''
      });
      
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting help request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close/cancel
  const handleCancel = () => {
    if (!isSubmitting) {
      navigate('/');
    }
  };

  return (
    <div className="help-form-container">
      <div className="form-header">
        <h2><span className="help-support-text">Help / Support</span></h2>
        <button className="close-button" onClick={handleCancel} disabled={isSubmitting} aria-label="Close form">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Phone Field */}
        <div className="form-field">
          <label htmlFor="helpPhone">
            Phone Number <span className="optional">(Optional)</span>
          </label>
          <input
            id="helpPhone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
        </div>

        {/* Subject Field */}
        <div className="form-field">
          <label htmlFor="helpSubject">
            Subject <span className="required">*</span>
          </label>
          <input
            id="helpSubject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Enter your subject"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Inquiry Type Field */}
        <div className="form-field">
          <label htmlFor="helpInquiryType">
            Inquiry Type <span className="required">*</span>
          </label>
          <select
            id="helpInquiryType"
            value={formData.inquiryType}
            onChange={(e) => handleInputChange('inquiryType', e.target.value)}
            disabled={isSubmitting}
            required
          >
            <option value="">Select inquiry type</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="land">Land</option>
            <option value="law">Law</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="form-field">
          <label htmlFor="helpDescription">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="helpDescription"
            rows="4"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your inquiry in detail..."
            disabled={isSubmitting}
            required
          />
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm;
