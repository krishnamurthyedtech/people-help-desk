import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UserDetails from './UserDetails';
import InquiriesTable from './InquiriesTable';
import InquiryForm from './InquiryForm';

const Dashboard = () => {
  const [view, setView] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [description, setDescription] = useState('');
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || {};

  useEffect(() => {
    if (view === 'inquiries' && userDetails.id) {
      fetchInquiries(userDetails.id);
    }
  }, [view, userDetails.id]);

  const fetchInquiries = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/inquiry/fetchByUser/${userId}`);
      setInquiries(response.data.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleClick = (viewType) => setView(viewType);

  const handleAddInquiryClick = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setSubject('');
      setDescription('');
    }
  };

  const handleSubmit = async () => {
    console.log("Submit function triggered");
    
  
    if (!userDetails.id) {
      alert('User ID is not available.');
      return;
    }
    try {
      const formData = { subject, inquiryType, description, name: userDetails.name };
      const response = await axios.post(`http://localhost:8080/api/inquiry/save/${userDetails.id}`, formData);
      if (response.data && response.data.data) {

      setInquiries(prevInquiries => [...prevInquiries, response.data.data]);
      }
      setShowForm(false);
      setSubject('');
      setInquiryType('');
      setDescription('');
    } catch (error) {
      console.error('Error saving inquiry:', error);
    }
  };


  const handleEditSubmit = async (data) => {
    console.log('--------------------------', data);
    try {

        const response = await axios.put(`http://localhost:8080/api/inquiry/update/${data.id}`, data);
        console.log('Updated Inquiry Data:', response.data);
        setShowForm(false);
      } catch (error) {
        console.error('Error updating inquiry:', error);
      }
    };


    return (
      <div className="dashboard-container">
        <aside className="sidebar">
          <div
            className={`sidebar-item ${view === 'user' ? 'active' : ''}`}
            onClick={() => handleClick('user')}
          >
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Profile</span>
          </div>
          <div
            className={`sidebar-item ${view === 'inquiries' ? 'active' : ''}`}
            onClick={() => handleClick('inquiries')}
          >
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span>My Inquiries</span>
          </div>
        </aside>
        <main className="main-content">
          {view === '' && <h2>Welcome {userDetails.name || 'User'}</h2>}
          {view === 'user' && <UserDetails userDetails={userDetails} />}
          {view === 'inquiries' && (
            <>
              <InquiriesTable inquiries={inquiries} onAddInquiryClick={handleAddInquiryClick} handleEditSubmit={handleEditSubmit} />
              {showForm && (
                <InquiryForm
                  onSubmit={handleSubmit}
                  subject={subject}
                  setSubject={setSubject}
                  inquiryType={inquiryType}
                  setInquiryType={setInquiryType}
                  description={description}
                  setDescription={setDescription}
                  createdBy={userDetails.name}
                  onClose={() => setShowForm(false)}
                />
              )}
            </>
          )}
        </main>
      </div>
    );
  };

  export default Dashboard;
