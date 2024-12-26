import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
import data from "../../sample-data/data";

const HistoryPage = () => {
  return(
    <div>
      <h1>History Page</h1>
      <ListBooks1 books = {data.books6}/>
      
    </div>
  )
};
export default HistoryPage;