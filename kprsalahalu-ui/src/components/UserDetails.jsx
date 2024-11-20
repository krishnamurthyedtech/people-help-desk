import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserDetails = ({ userDetails }) => (
  <TableContainer component={Paper} className="user-details-card">
    <h2>{userDetails.role === 'admin' ? 'Admin Details' : 'User Details'}</h2>
    <Table aria-label="user details">
      <TableHead>
        <TableRow>
          <TableCell>Field</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>{userDetails.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{userDetails.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Phone No</TableCell>
          <TableCell>{userDetails.phoneno}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Role</TableCell>
          <TableCell>{userDetails.role}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserDetails;

