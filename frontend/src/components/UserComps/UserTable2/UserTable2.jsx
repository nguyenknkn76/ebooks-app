import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import './UserTable2.scss';

const UserTable2 = ({ users, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-table-container">
      <div className="user-table-header">
        <h2>Users List</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img 
                    src={user.profile?.avatar?.file_url || '/default-avatar.png'} 
                    alt="avatar"
                    className="user-avatar"
                  />
                </td>
                <td>{user.profile?.name || 'N/A'}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.profile?.phone || 'N/A'}</td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => onUserSelect(user.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable2;