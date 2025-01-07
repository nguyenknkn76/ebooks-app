  // const id = '2ab13a60-d717-4eba-8946-5ec967b0ae54'
import React, { useState } from "react";
import axios from 'axios';
import "./UserInfoForm.scss";
import { FiUpload } from "react-icons/fi";

const UpdateProfileForm = ({userId}) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhYjEzYTYwLWQ3MTctNGViYS04OTQ2LTVlYzk2N2IwYWU1NCIsInVzZXJuYW1lIjoibmd1eWVua25rbjc2MiIsImlhdCI6MTczNTE2MDY3NCwiZXhwIjoxNzM1MjQ3MDc0fQ.XFJotu7xyVpNnvplI-cpvE3dHjF6fy50MTVDdMsya8U';
  const id = userId
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("default-avatar.png");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('userId', id);
  
      if (avatar) {
        data.append('avatar', avatar);
      }
  
      const response = await axios.post('http://localhost:5000/api/profile', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Profile created:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error creating profile:', error.response?.data || error);
      alert('Error updating profile: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="user-info-form">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img src={avatarPreview} alt="Avatar" className="avatar" />
              <label className="upload-icon">
                <FiUpload size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <div className="details-section">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="create-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;