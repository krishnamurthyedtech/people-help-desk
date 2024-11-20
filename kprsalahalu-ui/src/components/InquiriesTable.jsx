import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditInquiryForm from './EditInquiryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
const InquiriesTable = ({
  inquiries,
  onAddInquiryClick,
  comment,
  setComment,
  handleEditSubmit,
  handleDelete,
  onOpenComments,
  userRole,
  isAdmin
}) => {
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filterType, setFilterType] = useState("All");

  const handleEditClick = (inquiry) => {
    setEditingInquiry(inquiry);
    setShowEditForm(true);
  };

  const filteredInquiries = filterType === "All"
    ? inquiries
    : inquiries.filter(inquiry => inquiry.inquiryType?.trim().toLowerCase() === filterType.toLowerCase());

  const columns = [
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'name', headerName: 'Created By', width: 130 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'inquiryType', headerName: 'Inquiry Type', width: 120 },
    {
      field: 'creationTime',
      headerName: 'Created At',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return !isNaN(date) ? format(date, 'yyyy-MM-dd') : 'N/A';
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <>
          <span
            onClick={() => handleEditClick(params.row)}
            style={{ cursor: 'pointer', color: '#3498db', marginRight: '8px' }}
            title="Edit Inquiry"
          >
            <FontAwesomeIcon icon={faFilePen} />
          </span>
          <span
            onClick={() => handleDelete(params.row.id)}
            style={{ cursor: 'pointer', color: '#e74c3c' }}
            title="Delete Inquiry"
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </>
      )
    },
    {
      field: 'comment',
      headerName: 'Comment',
      width: 100,
      renderCell: (params) => (
        <button onClick={() => onOpenComments(params.row.id)}>
          View
        </button>
      )
    }
  ];

  return (
    <div className="table-container">
      {userRole !== 'admin' && (
        <button className="add-inquiry-button" onClick={onAddInquiryClick}>
          Add Inquiry
        </button>
      )}
      <h2>{isAdmin ? 'User Inquiries' : 'My Inquiries'}</h2>
      {showEditForm && editingInquiry && (
        <EditInquiryForm
          onSubmit={handleEditSubmit}
          inquiry={editingInquiry}
          comment={comment}
          setComment={setComment}
          onClose={() => setShowEditForm(false)}
        />
      )}
      <label htmlFor="filter">Filter Inquiry Type: </label>
      <select id="filter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All</option>
        <option value="Education">Education</option>
        <option value="Law">Law</option>
        <option value="Finance">Finance</option>
        <option value="Land">Land</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#2980b9",

            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#2980b9",
              fontWeight: "bold",
              fontSize: "17px",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "16px",
            },
          }}
          rows={filteredInquiries}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.id}
          checkboxSelection={userRole !== 'admin'}
        />
      </div>
    </div>
  );
};

export default InquiriesTable;
