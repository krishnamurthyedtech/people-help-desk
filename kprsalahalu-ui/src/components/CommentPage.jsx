import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const CommentsPage = () => {
  const { inquiryId, userId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/comments/fetch/${inquiryId}`
        );
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
      alert('Comment cannot be empty!');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/comments/add/${inquiryId}`,
        {
          comment: newComment,
          userId: userId,
        }
      );
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const onClose = () => {
    navigate(`/dashboard`);
  };

  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
          position: 'absolute',
          top: 10,
          right: 15,
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '50%',
          minWidth: '40px',
          height: '40px',
          padding: 0,
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: '20px' }} />
      </Button>

      <Typography variant="h4" gutterBottom textAlign="center">
        Comments for Inquiry ID: {inquiryId}
      </Typography>
      <TableContainer component={Paper}
      sx={{
        maxWidth: '100%',
        margin: 'auto',  
        overflowX: 'auto',
      }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: 'white',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                User ID
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: 'white',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: 'white',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                Creation Time
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: 'white',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell sx={{ fontSize: '16px' }}>{comment.id}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{comment.userName}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>
                  {new Date(comment.creationTime).toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{comment.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          Add More
        </Button>
      </Box>
      {showForm && (
        <Box
          component="form"
          onSubmit={handleAddComment}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            multiline
            rows={1}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment"
            label="Comment"
            fullWidth
            sx={{ maxWidth: 300 }}
          />
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentsPage;
