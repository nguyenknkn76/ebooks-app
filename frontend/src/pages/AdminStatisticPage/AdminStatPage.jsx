import ListCards from "../../components/StatComps/Card/ListCards";
import LineChart from "../../components/StatComps/Chart/LineChart";

const AdminStatPage = () => {
  return (
    <div>
      <h2 style={{marginLeft:'20px'}}>System Data Statistics </h2>
      <ListCards/>
      <LineChart/>
    </div>
  );
};

export default AdminStatPage;