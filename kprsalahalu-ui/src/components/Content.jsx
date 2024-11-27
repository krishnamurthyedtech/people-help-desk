import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Content = () => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState(''); 
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [description, setDescription] = useState('');
  

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
          {[...Array(9)].map((_, index) => (
            <iframe
              key={index}
              src={`https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS`}
              allowFullScreen
              title={`Video ${index + 1}`}
            ></iframe>
          ))}
        </section>
      </main>
    </>
  );
};

export default Content;


// import React from 'react';
// const Content = () => {
  
//     const buttonStyle = {
//       position: 'fixed',
//       left: '90%',
//       top: '50%',
//       zIndex: 1040,
      
//     };
//   return (
//     <>
//       <main>
//         <div class="code-button" style={buttonStyle}>
//           <div class="menu justify-content-center modal-menu">
//             <ul class="pl-0 topics">
//               <button type="button" class="btn btn-primary modal-btn" data-toggle="modal" data-target="#myModal">
//                 click to write add inquiry
//               </button>
//             </ul>
//           </div>
//         </div>
//         <section className="videos">
//           <iframe
//             src="https://www.youtube.com/embed/As3qBChB9Oo?si=AUsS48_-LA0WCIfu"
//             allowFullScreen
//             title="Video 1"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/ft9G5yUM37o?si=hV2RBYPU_rwnYozj"
//             allowFullScreen
//             title="Video 2"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 3"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 4"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 5"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 6"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 7"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/T2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 8"
//           ></iframe>
//           <iframe
//             src="https://www.youtube.com/embed/sT2PZSqXk55Q?si=sHn29ftUYp8ym1VS"
//             allowFullScreen
//             title="Video 9"
//           ></iframe>
//         </section>
//       </main>


//     </>
//   );
// };

// export default Content;
