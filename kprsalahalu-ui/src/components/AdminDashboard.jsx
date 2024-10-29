import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchAllInquiries();
  }, []);

  const fetchAllInquiries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inquiry/fetchAll');
      setInquiries(response.data.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>All User Inquiries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Description</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry.id}</td>
              <td>{inquiry.subject}</td>
              <td>{inquiry.inquiryType}</td>
              <td>{inquiry.description}</td>
              <td>{inquiry.user?.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
