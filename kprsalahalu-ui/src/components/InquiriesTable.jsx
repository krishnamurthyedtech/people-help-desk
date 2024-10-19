import React, { useState } from 'react';
import EditInquiryForm from './EditInquiryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';


const InquiriesTable = ({ inquiries, onAddInquiryClick, handleEditSubmit, handleDelete }) => {

  const [editingInquiry, setEditingInquiry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [comment, setComment] = useState('');

  const handleEditClick = (inquiry) => {
    console.log("Inquiry,", inquiry);
    setEditingInquiry(inquiry);
    setComment('');
    setShowEditForm(true);
  };

  return (
    <div className="table-container">
      <button className="add-inquiry-button" onClick={onAddInquiryClick}>
        Add Inquiry
      </button>
      {showEditForm && editingInquiry && (
        <EditInquiryForm
          onSubmit={handleEditSubmit}
          inquiry={editingInquiry}
          comment={comment}
          setComment={setComment}
          onClose={() => setShowEditForm(false)}
        />
      )}
      <h2>My Inquiries</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>

            <th>Created By</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
            <th>inquiry type</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length > 0 ? inquiries.map(inquiry => (
            <tr key={inquiry.id}>
              <td>{inquiry.subject}</td>
              <td>{inquiry.name}</td>
              <td>{inquiry.description}</td>

              <td>{new Date(inquiry.creationTime).toLocaleDateString()}</td>
              <td>
                <span
                  onClick={() => handleEditClick(inquiry)}
                  style={{ cursor: 'pointer', color: '#3498db' }}
                  title="Edit Inquiry"
                >
                  <FontAwesomeIcon icon={faFilePen} />
                </span>
                <span
                  onClick={() => handleDelete(inquiry.id)}
                  style={{ cursor: 'pointer', color: '#e74c3c' }}
                  title="Delete Inquiry"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </td>
              <td>{inquiry.inquiryType}</td>
              <td>
                {/* Map through the comments and display them */}
                {inquiry.comments && inquiry.comments.length > 0 ? (
                  <ul>
                    {inquiry.comments.map((comment, index) => (
                      <li key={index}>{comment.comment}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No comments</span>
                )}
              </td>

            </tr>
          )) : (
            <tr><td colSpan="5">No inquiries found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

  ;

export default InquiriesTable;
