import { useEffect, useState } from "react";
import Banner from "../../components/BookComps/Banner/Banner";
import ListBooks1 from "../../components/bookComps/ListBooks1/ListBooks1";
import ListBooks2 from "../../components/BookComps/ListBooks2/ListBooks2";
import SlideBooks from "../../components/BookComps/Slide/SlideBooks";
import data from "../../sample-data/data";
import BookService from "../../services/BookService";
const HomePage = () => {
  const [books, setBooks] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    sort: "-created_at",
    genres: [],
    publish_year: "",
    author: "",
    status: "",
    page: 1,
    limit: 10
  });
  useEffect(() => {
    BookService.getAllBooks(filter)
    .then(response => {
      setBooks(response.books);
      console.log(response.books)  
    })
  },[]);
  
  return(
    <div>
      {
        books ? (
          <div>
            <Banner books = {books}/>
            <SlideBooks books = {books}/>
            <ListBooks1 books = {books}/>
          </div>
        )
        : null
      }
      {/* <Banner books = {books}/> */}
      {/* <ListBooks2 books = {data.books6}/> */}
      {/* <ListBooks1 books={data.books6} /> */}
    </div>
  )
};

export default HomePage;

