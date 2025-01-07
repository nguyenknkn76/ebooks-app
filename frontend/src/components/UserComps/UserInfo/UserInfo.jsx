import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../../services/UserService';
import './UserInfo.scss';

const UserInfo = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="user-info">
      <button className="user-info__close" onClick={onClose}>×</button>
      <div className="user-info__header">
        <div className="user-info__avatar">
          <img 
            src={user.profile?.avatar?.file_url || '/default-avatar.png'} 
            alt="User avatar" 
          />
        </div>
        <div className="user-info__title">
          <h2>{user.profile?.name || 'No Name'}</h2>
          <span className={`role-badge ${user.role}`}>{user.role}</span>
        </div>
      </div>

      <div className="user-info__content">
        <div className="info-group">
          <label>Username</label>
          <p>{user.username}</p>
        </div>

        <div className="info-group">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        <div className="info-group">
          <label>Phone</label>
          <p>{user.profile?.phone || 'Not provided'}</p>
        </div>

        <div className="info-group">
          <label>Joined Date</label>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;