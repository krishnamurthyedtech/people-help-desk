import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const HelpForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
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

    if (!formData.phone.trim() || !formData.subject.trim() || !formData.inquiryType || !formData.description.trim()) {
      alert(t('fillRequiredFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload
      const payload = {
        phone: formData.phone.trim() ? Number(formData.phone.trim()) : null,
        subject: formData.subject.trim(),
        inquiryType: formData.inquiryType,
        description: formData.description.trim()
      };

      // Make API call to backend
      const response = await fetch('http://localhost:8080/api/inquiry/help-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit help request');
      }

      const result = await response.json();
      console.log('Help request submitted successfully:', result);

      // Show success message
      alert(t('helpSuccess'));

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
        <h2><span className="help-support-text">{t('helpTitle')}</span></h2>
        <button className="close-button" onClick={handleCancel} disabled={isSubmitting} aria-label="Close form">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Phone Field */}
        <div className="form-field">
          <label htmlFor="helpPhone">
            {t('phoneNumber')} <span className="optional">({t('optional')})</span>
          </label>
          <input
            id="helpPhone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={t('phonePlaceholder')}
            disabled={isSubmitting}
          />
        </div>

        {/* Subject Field */}
        <div className="form-field">
          <label htmlFor="helpSubject">
            {t('subject')} <span className="required">*</span>
          </label>
          <input
            id="helpSubject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder={t('subjectPlaceholder')}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Inquiry Type Field */}
        <div className="form-field">
          <label htmlFor="helpInquiryType">
            {t('inquiryType')} <span className="required">*</span>
          </label>
          <select
            id="helpInquiryType"
            value={formData.inquiryType}
            onChange={(e) => handleInputChange('inquiryType', e.target.value)}
            disabled={isSubmitting}
            required
          >
            <option value="">{t('inquiryTypePlaceholder')}</option>
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
            {t('description')} <span className="required">*</span>
          </label>
          <textarea
            id="helpDescription"
            rows="4"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder={t('descriptionPlaceholder')}
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
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm;
