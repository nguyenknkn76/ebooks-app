import { useEffect, useState } from "react";
import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
import BookService from "../../services/BookService";

const RankingPage = () => {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    BookService
    // .getAllBooks({limit: 5, sort: 'view_count', order: -1})
    .getBooksByMonthly()
    .then(response => {
      setBooks(response);
      console.log(response);
    });
  },[]);
  return (
    <div>
      {
        books && (
          <div>
            <ListBooks1 books = {books}/>
          </div>
        )
      }
    </div>
  )
}

export default RankingPage;