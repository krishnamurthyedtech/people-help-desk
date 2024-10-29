import React, { useState } from 'react';
import EditInquiryForm from './EditInquiryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
const InquiriesTable = ({ inquiries, onAddInquiryClick, comment, setComment, handleEditSubmit, handleDelete, onOpenComments }) => {
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const handleEditClick = (inquiry) => {
    console.log("Inquiry,", inquiry);
    console.log("comment,", comment);
    setEditingInquiry(inquiry);
    setShowEditForm(true);
  };
  const filteredInquiries = filterType === "All"
    ? inquiries
    : inquiries.filter(inquiry => inquiry.inquiryType?.trim().toLowerCase() === filterType.toLowerCase());
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
      <label htmlFor="filter">Filter Inquiry Type: </label>
      <select id="filter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All</option>
        <option value="Education">Education</option>
        <option value="Law">Law</option>
        <option value="Finance">Finance</option>
        <option value="Land">Land</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Created By</th>
            <th>Description</th>
            <th>Inquiry Type</th>
            <th>Created At</th>
            <th>Actions</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
        {filteredInquiries.length > 0 ? filteredInquiries.map(inquiry => (
            <tr key={inquiry.id}>
              <td>{inquiry.subject}</td>
              <td>{inquiry.name}</td>
              <td>{inquiry.description}</td>
              <td>{inquiry.inquiryType}</td>
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
              <td>
                <button onClick={() => onOpenComments(inquiry.id)}>
                  View
                </button>
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
