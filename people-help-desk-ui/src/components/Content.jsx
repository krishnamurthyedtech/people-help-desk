import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { videosData } from '../data/videosData';

const Content = ({ selectedCategory }) => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState(''); 
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [description, setDescription] = useState(''); 

  console.log('Selected Category:', selectedCategory);  

  const filteredVideos = selectedCategory === 'HOME' || selectedCategory === 'All'
    ? videosData
    : videosData.filter(video => video.category === selectedCategory);
  
  const handleFormSubmit = () => {
    console.log({ email,phoneno,subject, inquiryType, description });
    setShowInquiryForm(false);  
  };
  
  return (
    <>
      <main>
        <div className="code-button" style={{ position: 'fixed', left: '90%', top: '50%', zIndex: 1040 }}>
          <div className="menu justify-content-center modal-menu">
            <ul className="pl-0 topics">
              <button
                type="button"
                className="btn btn-primary modal-btn"
                onClick={() => setShowInquiryForm(true)}  
              >
                Click to <br /> Add Inquiry
              </button>
            </ul>
          </div>
        </div>
        {showInquiryForm && (
          <div className="form-overlay">
          <div className="form-overlay-container">
          <button className="close-button" onClick={()=> setShowInquiryForm(false)}><FontAwesomeIcon icon={faXmark} /></button>
            <form onSubmit={handleFormSubmit} className="inquiry-form">
              <h2>Add New Inquiry</h2>

              <div className="form-field">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Phone No:</label>
                <input
                  type="tel"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Inquiry Type:</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  required
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="EDUCATION">Education</option>
                  <option value="LAW">Law</option>
                  <option value="FINANCE">Finance</option>
                  <option value="LAND">Land</option>
                  <option value="HEALTHCARE">Healthcare</option>
                </select>
              </div>

              <div className="form-field">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
        <section className="videos">
          {filteredVideos.map((video) => (
            <div className="video-card" key={video.id}>
              <div className="video-frame-wrapper">
                <iframe
                  src={video.src}
                  allowFullScreen
                  title={video.title}             
                ></iframe>
              </div>
              <div className="video-card-body">
                <div className="video-meta">
                  <span className={`video-category-badge badge-${video.category.toLowerCase()}`}>
                    {video.category}
                  </span>
                </div>
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
              </div>
            </div>
          ))}
        </section> 
      </main>
    </>
  );
};

export default Content;


