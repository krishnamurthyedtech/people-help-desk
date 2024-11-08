import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CommentsPage = () => {
  const { inquiryId, userId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/fetch/${inquiryId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [inquiryId]);
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/comments/add/${inquiryId}`, {
        comment: newComment,
        userId: userId
      });
      setComments(prev => [...prev, response.data]);
      setNewComment('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const onClose = () => {
    navigate(`/dashboard`)
  };
  return (
    <div className="table-container">
      <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
      <h2>Comments for Inquiry ID: {inquiryId}</h2>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Creation Time</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.userName}</td>
              <td>{new Date(comment.creationTime).toLocaleString()}</td>
              <td>{comment.comment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <button onClick={() => setShowForm(!showForm)}>
          Add More
        </button>
        {showForm && (
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </center>
    </div>
  );
};

export default CommentsPage;
