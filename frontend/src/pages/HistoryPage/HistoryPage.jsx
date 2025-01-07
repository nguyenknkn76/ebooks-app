import { useSelector } from "react-redux";
import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
import data from "../../sample-data/data";
import BookService from "../../services/BookService";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const loggedin = useSelector(state => state.loggedin);
  const [books, setBooks] = useState(null);
  
  const fetchBooks = async () => {
    useEffect(() => {
      BookService.getHistoriesBooksByUserId(loggedin.user.id)
      .then(response => {
        setBooks(response);
        console.log(response)  
      })
    },[]);
  };
  loggedin && fetchBooks();

  return(
    <div>
      <h2 style={{marginLeft: '20px', marginBottom:'0px'}}>Reading History</h2>
      {
        books && <ListBooks1 books = {books}/>
      }  
  
    </div>
  )
};
export default HistoryPage;