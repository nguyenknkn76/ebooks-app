import UserInfoForm from "../../components/UserComps/UserInfoForm/UserInfoForm";
import data from "../../sample-data/data";

const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <UserInfoForm user={data.user}/>
    </div>
  );
};

export default UserProfilePage;