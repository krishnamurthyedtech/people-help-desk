import React from 'react';

const UserDetails = ({ userDetails }) => (
  <div className="user-details-card">
    <h2>User Details</h2>
    <table>
      <tbody>
        <tr><th>Name</th><td>{userDetails.name}</td></tr>
        <tr><th>Email</th><td>{userDetails.email}</td></tr>
        <tr><th>Phone No</th><td>{userDetails.phoneno}</td></tr>
      </tbody>
    </table>
  </div>
);

export default UserDetails;
