import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Content = ({ selectedCategory }) => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState(''); 
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [description, setDescription] = useState(''); 
    const videos = [
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 1", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 2", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 3", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 4", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 5", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 6", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 7", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 8", category: "LAW" },
      { src: "https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS", title: "Video 9", category: "LAW" },
      { src: "https://www.youtube.com/embed/7kElPm9vIzQ?si=J__rHxEz5AoUGK1M", title: "Video 10", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/tgVXZzUxdpw?si=slg4XF2C3q2zJctm" , title: "Video 11", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/liXsirygfxk?si=o6rIVE_REu2Qhoei" , title: "Video 12", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/AsjSOkRT3yM?si=SZik2_T1ZDdMVnQj", title: "Video 13", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/ngaIJhxwycQ?si=iDFKPkHaBUUNgypN", title: "Video 14", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/h269r81Q4_s?si=-00O2lhiOjiU3W9I", title: "Video 15", category: "FINANCE" },
      { src: "https://www.youtube.com/embed/Wdz1rfvQWTk?si=tuzJR9Wk66M3nyES", title: "Video 16", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/rOP7l84GfL8?si=AFqnDKJRGFl04z5T", title: "Video 17", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/9vRAhzVjIUY?si=pknnFOIG9yHEW5TQ", title: "Video 18", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/aLcHCMzLzrc?si=fBHR-dOS3NzVAdH_", title: "Video 19", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/5BXns3xNTK4?si=Y1QPuy_cFZX4q_6E", title: "Video 20", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/lQ6WSsFUzyU?si=0-lS4EIhtjpT9Lpu", title: "Video 21", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/1wIeeg9jF2M?si=EDNhVGqBeyur7vzR", title: "Video 22", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/cS08-ROeslk?si=fiSb-zz8h7oHyDu-", title: "Video 23", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/xNzaXhH0MC8?si=Y4z_GHWlB94P6-g7", title: "Video 24", category: "EDUCATION" },
      { src: "https://www.youtube.com/embed/R69nNWJNEAY?si=KDLw4rpz4t2y6DFn", title: "Video 25", category: "LAND" },
      { src: "https://www.youtube.com/embed/RP13sxBSp2w?si=GALfrna3de6Vw956", title: "Video 26", category: "LAND" },
      { src: "https://www.youtube.com/embed/cdEjy4D9sVg?si=rUM_EN_uDTIKBI_o", title: "Video 27", category: "LAND" },
      { src: "https://www.youtube.com/embed/FkketTdPxj0?si=LPJgdAedaqjIl0cB" , title: "Video 28", category: "LAND" },
      { src: "https://www.youtube.com/embed/L2dGOHykzNM?si=VyV8V74GYFKmz2f-", title: "Video 29", category: "LAND" },
      { src: "https://www.youtube.com/embed/t-GzPJU2V4o?si=qky3SAbvWSSx24Z6&amp;controls=0", title: "Video 30", category: "LAND" },
      { src: "https://www.youtube.com/embed/XBRF9uX7_xc?si=c_-eZv2BA2Nmz1wC", title: "Video 31", category: "HEALTH" },
      { src:"https://www.youtube.com/embed/NIIV9Fmg8fk?si=IcG4ROFV57ItDmtC", title: "Video 32", category: "HEALTH" },
      { src:"https://www.youtube.com/embed/nTfKKGQqIxo?si=H75KNGpPtRVtSEHv", title: "Video 33", category: "HEALTH" },
    ];
  
    console.log('Selected Category:', selectedCategory);  

    const filteredVideos = selectedCategory === 'HOME' || selectedCategory === 'All'
      ? videos
      : videos.filter(video => video.category === selectedCategory);
  
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
          {filteredVideos.map((video, index) => (
            <iframe
              key={index}
              src={video.src}
              allowFullScreen
              title={video.title}             
            ></iframe>
          ))}
        </section> 
      </main>
    </>
  );
};

export default Content;


