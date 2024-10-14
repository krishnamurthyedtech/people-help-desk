import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditInquiryForm = ({ onSubmit, inquiry, onClose }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: inquiry, // Pre-fill form with inquiry data
  });

  // Pre-fill form when component mounts (if inquiry data is available)
  React.useEffect(() => {
    if (inquiry) {
      setValue("subject", inquiry.subject);
      setValue("description", inquiry.description);
      setValue("inquiryType", inquiry.inquiryType);
      setValue("comment", inquiry.comment || ""); // Optional: comment might be empty initially
    }
  }, [inquiry, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, id: inquiry.id }); // Keep id from the original inquiry
  };

  return (
    <div className="form-overlay">
      <div className="form-overlay-container">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="inquiry-form">
          <h2>Edit Inquiry</h2>
          
          <label>
            Subject:
            <input
              type="text"
              {...register("subject", { required: true })} // Editable subject
            />
          </label>

          <label>
            Inquiry Type:
            <select
              {...register("inquiryType", { required: true })}
            >
              <option value="">Select Inquiry Type</option>
              <option value="education">Education</option>
              <option value="law">Law</option>
              <option value="finance">Finance</option>
              <option value="land">Land</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </label>

          <label>
            Description:
            <textarea
              {...register("description", { required: true })} // Editable description
            />
          </label>

          <label>
            Comment:
            <textarea
              {...register("comment")} // New comment field
            />
          </label>

          <button className="submit-button" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditInquiryForm;
