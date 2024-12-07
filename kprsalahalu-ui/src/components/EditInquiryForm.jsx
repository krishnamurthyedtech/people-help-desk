import React from 'react';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditInquiryForm = ({ onSubmit, inquiry, onClose }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: inquiry,
  });
  const [successMessage, setSuccessMessage] = useState("");

  React.useEffect(() => {
    if (inquiry) {
      setValue("subject", inquiry.subject);
      setValue("description", inquiry.description);
      setValue("inquiryType", inquiry.inquiryType); 
      setValue("name", inquiry.name);
      setValue("comment", inquiry.comment || "");
    }
  }, [inquiry, setValue]);

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    onSubmit({ ...data, id: inquiry.id });
    setSuccessMessage("Inquiry updated successfully");
  };
  return (
    <div className="form-overlay">
      <div className="form-overlay-container">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="inquiry-form">
          <h2>Edit Inquiry</h2>
          <div className="form-field">
          <label>
            Subject:
          </label>
            <input
              type="text"
              {...register("subject", { required: true })} 
            />
            </div>
            <div className="form-field">
          <label>
            Inquiry Type:
          </label>
            <select             
            >
              <option value="">Select Inquiry Type</option>
              <option value="education">Education</option>
              <option value="law">Law</option>
              <option value="finance">Finance</option>
              <option value="land">Land</option>
              <option value="healthcare">Healthcare</option>
            </select>
            </div>
            <div className="form-field">
          <label>
            Description:
            </label>
            <textarea
              {...register("description", { required: true })} 
            />
            </div>
          <button className="submit-button" type="submit">Update</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditInquiryForm;
