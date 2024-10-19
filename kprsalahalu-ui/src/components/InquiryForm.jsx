import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const InquiryForm = ({ onSubmit, subject, setSubject, inquiryType, setInquiryType, description, setDescription, comment, setComment, createdBy, onClose }) => {
  
  return (
    <div className="form-overlay">
      <div className="form-overlay-container">
        <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
        <form onSubmit={onSubmit} className="inquiry-form">

          <h2>Add New Inquiry</h2>

          <div className="form-field">
            <label>
              Subject:
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>
              Inquiry type:
            </label>
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
          </div>
          <div className="form-field">
            <label>
              Description:
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form field">
            <label>
              Comment:
            </label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              />
         </div>
          <div className="form-field">
            <label>
              Created By:
            </label>
            <input
              type="text"
              name="createdBy"
              value={createdBy}
              readOnly
            />
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
