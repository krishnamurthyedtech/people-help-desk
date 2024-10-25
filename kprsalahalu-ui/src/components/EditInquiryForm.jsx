import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditInquiryForm = ({ onSubmit, inquiry, onClose }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: inquiry,
  });

  React.useEffect(() => {
    if (inquiry) {
      setValue("subject", inquiry.subject);
      setValue("description", inquiry.description);
      setValue("inquiryType", inquiry.inquiryType);
      setValue("comment", inquiry.comment || ""); 
    }
  }, [inquiry, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, id: inquiry.id });
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
              {...register("subject", { required: true })} 
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
              {...register("description", { required: true })} 
            />
          </label>
          <button className="submit-button" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditInquiryForm;
