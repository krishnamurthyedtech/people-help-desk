import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const InquiryForm = ({ onSubmit, subject, setSubject, inquiryType, setInquiryType, description, setDescription, createdBy, onClose }) => {
  return (
    <div className="form-overlay">
      <div className="form-overlay-container">
        <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
        <form onSubmit={onSubmit} className="inquiry-form">

          <h2>Add New Inquiry</h2>
          

          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <label>
            Inquiry type:
            <select
              name="inquiry type"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              required
            >
              <option value="">Select Inquiry Type</option>
              <option value="EDUCATION">Education</option>
              <option value="LAW">Law</option>
              <option value="FINANCE">Finance</option>
              <option value="LAND">Land</option>
              <option value="HEALTHCARE">Healthcare</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Created By:
            <input
              type="text"
              name="createdBy"
              value={createdBy}
              readOnly
            />
          </label>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
