import UserInfoForm from "../../components/UserComps/UserInfoForm/UserInfoForm";
import UserTable from "../../components/UserComps/UserTable/UserTable";
import data from "../../sample-data/data";

const AdminUserPage = () => {
  return (
    <div>
      <h1>AdminUserPage</h1>
      <UserInfoForm user={data.user}/>

      <UserTable users={data.users1}/>

    </div>
  );
};

export default AdminUserPage;