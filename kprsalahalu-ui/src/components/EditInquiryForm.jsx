import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditInquiryForm = ({ onSubmit, inquiry, comment, setComment, onClose }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit({ ...data});
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
              defaultValue={inquiry.subject}
              readOnly
              {...register("subject")} 
            />
          </label>
          <label>
            Description:
            <textarea
              defaultValue={inquiry.description}
              readOnly
              {...register("description")} 
            />
          </label>
          
          <label>
            Comment:
            <textarea
              {...register("comment", { required: true })} 
            />
          </label>
          <button className="submit-button" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditInquiryForm;