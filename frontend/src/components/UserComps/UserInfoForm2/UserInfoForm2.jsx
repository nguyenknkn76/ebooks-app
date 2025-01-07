import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import './UserInfoForm2.scss';

const UserInfoForm2 = ({ user }) => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    name: user.profile?.name || '',
    phone: user.profile?.phone || '',
    address: user.profile?.address || '',
  });
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await UserService.updateProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
      setIsEditMode(false);
      // Optional: Show success message
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.profile?.name || '',
      phone: user.profile?.phone || '',
      address: user.profile?.address || '',
    });
    setIsEditMode(false);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="user-info-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="user-info-header">
        <h2>User Information</h2>
        <div className="button-group">
          {!isEditMode ? (
            <>
              <button className="btn edit-btn" onClick={handleEdit}>Edit</button>
              <button className="btn back-btn" onClick={handleBack}>Back</button>
            </>
          ) : (
            <>
              <button 
                className="btn update-btn" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button 
                className="btn cancel-btn" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <form className="form-container">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>

        {user.profile?.avatar && (
          <div className="form-group">
            <label>Avatar:</label>
            <img 
              src={user.profile.avatar.file_url} 
              alt="User avatar" 
              className="user-avatar"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default UserInfoForm2;