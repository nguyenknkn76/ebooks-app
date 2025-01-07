import React, { useState, useEffect } from "react";
import UserInfo from "../../components/UserComps/UserInfo/UserInfo";
import UserTable2 from "../../components/UserComps/UserTable2/UserTable2";
import UserService from "../../services/UserService";
import UpdateProfileForm from "../../components/UserComps/UserInfoForm/UpdateProfileForm";
// import "./AdminUserPage.scss";

const AdminUserPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      const userData = await UserService.getUserById(userId);
      setSelectedUser(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-user-page">
      {selectedUser && <UpdateProfileForm userId={selectedUser.id} />}
      {/* <h2>User Management</h2> */}
      {selectedUser && (
        <div className="admin-user-info">
          <UserInfo 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)}
          />
        </div>
      )}
      <div className="admin-user-content">
        <div className="admin-user-table">
          <UserTable2 
            users={users} 
            onUserSelect={handleUserSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;