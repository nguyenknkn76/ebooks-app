import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import UserInfoForm2 from "../../components/UserComps/UserInfoForm2/UserInfoForm2"
import EditUserForm from "../../components/UserComps/EditUserForm/EditUserForm";

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUserById(id);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  
  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      <EditUserForm userId={id} />
      {/* <UserInfoForm2 user={user} /> */}
    </div>
  );
};

export default UserProfilePage;