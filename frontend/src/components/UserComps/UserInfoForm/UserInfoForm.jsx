import React, { useState } from "react";
import "./UserInfoForm.scss";
import { FiUpload } from "react-icons/fi"; // Import icon upload

const UserInfoForm = ({ user }) => {
  const [userData, setUserData] = useState({ ...user });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar_image || "default-avatar.png");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    console.log("Updated User Data:", userData);
    alert("User updated successfully!");
  };

  return (
    <div className="user-info-form">
      <h2>User Information</h2>
      <div className="form-content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={avatarPreview} alt="Avatar" className="avatar" />
            {/* <label className="upload-icon">
              <FiUpload size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </label> */}
          </div>
        </div>

        {/* User Details Section 1 */}
        <div className="details-section">
          <div className="form-group">
            <label>Image:</label>
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
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* User Details Section 2 */}
        <div className="details-section">
          <div className="form-group">
            <label>Roles</label>
            <input type="text" value={userData.roles.join(", ")} disabled />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={userData.username} disabled />
          </div>
          <div className="form-group">
            <label>Dob</label>
            <input
              type="text"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Update Button */}
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UserInfoForm;