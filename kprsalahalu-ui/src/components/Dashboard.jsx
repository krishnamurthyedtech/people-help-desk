import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UserDetails from './UserDetails';
import InquiriesTable from './InquiriesTable';
import InquiryForm from './InquiryForm';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [view, setView] = useState('');
  const [inquiryId, setInquiryId] = useState(0);
  const [inquiries, setInquiries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (view === 'inquiries' && userDetails.id) {
      if (userDetails.role === 'admin') {
        fetchAllInquiries(); 
      } else {
        fetchInquiries(userDetails.id); 
      }
    }
  }, [view, userDetails.id, userDetails.role]);

  const fetchInquiries = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/inquiry/fetchByUser/${userId}`);
      setInquiries(response.data.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };
  const fetchAllInquiries = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/inquiry/fetch`);
      setInquiries(response.data.data);
    } catch (error) {
      console.error('Error fetching all inquiries:', error);
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

  const handleOpenComments = (inquiryId) => {
    setInquiryId(inquiryId);
    setOpenComments(!openComments);
    if (!openComments) {
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
      const comments = [
        {
          comment: comment
        }
      ]
      const formData = { subject, inquiryType, description, comments, name: userDetails.name };
      console.log('Form Data', formData);
      const response = await axios.post(`http://localhost:8080/api/inquiry/save/${userDetails.id}`, formData);
      if (response.data && response.data.data) {

        setInquiries(prevInquiries => [...prevInquiries, response.data.data]);
      }
      setShowForm(false);
      setSubject('');
      setInquiryType('');
      setDescription('');
      setComment('');
    } catch (error) {
      console.error('Error saving inquiry:', error);
    }
  };


  const handleEditSubmit = async (data) => {
    console.log('Data', data);
    console.log('comment', comment[data.id]);
    try {
      const comments = [
        ...data.comments,
        {
          comment: comment[data.id]
        }
      ]
      const formData = { ...data, comments }
      console.log('Form Data', formData);
      const response = await axios.put(`http://localhost:8080/api/inquiry/update/${data.id}`, formData);
      console.log('Updated Inquiry Data:', response.data);
      fetchInquiries(formData.user.id);
      setComment('');
      setShowForm(false);
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };
  const handleDelete = async (inquiryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/inquiry/delete/${inquiryId}`);
      setInquiries((prevInquiries) =>
        prevInquiries.filter((inquiry) => inquiry.id !== inquiryId)
      );
    } catch (error) {
      console.error('Error deleting inquiry:', error);
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
          <span>{userDetails.role === 'admin' ? 'Show All Inquiries' : 'My Inquiries'}</span>
        </div>
      </aside>
      <main className="main-content">
        {view === '' && (
          <>
            <h5>Login Successfully......</h5>
            <h2>
              Welcome {userDetails.role === 'admin' ? `Admin ${userDetails.name || 'User'}` : userDetails.name || 'User'}
            </h2>
          </>
        )}
        {view === 'user' && <UserDetails userDetails={userDetails} />}
        {view === 'inquiries' && (
          <>
            <InquiriesTable
              inquiries={inquiries}
              onAddInquiryClick={userDetails.role !== 'admin' ? handleAddInquiryClick : null}
              isAdmin={userDetails.role === 'admin'}
              comment={comment}
              setComment={setComment}
              handleEditSubmit={handleEditSubmit}
              handleDelete={handleDelete}
              onOpenComments={handleOpenComments}
              userRole={userDetails.role}
            />
            {showForm && (
              <InquiryForm
                onSubmit={handleSubmit}
                subject={subject}
                setSubject={setSubject}
                inquiryType={inquiryType}
                setInquiryType={setInquiryType}
                description={description}
                setDescription={setDescription}
                comment={comment}
                setComment={setComment}
                createdBy={userDetails.name}
                onClose={() => setShowForm(false)}
              />
            )}
            {openComments && navigate(`/dashboard/comments/${inquiryId}`)}
          </>
        )}
      </main>
    </div>
  );  
};

export default Dashboard;
