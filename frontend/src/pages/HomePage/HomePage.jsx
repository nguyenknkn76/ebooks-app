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
            <h2 style={{marginLeft: "20px", marginBottom: "0px", marginTop: "20px"}}>Trending Book</h2>
            <SlideBooks books = {books}/>
            <h2 style={{marginLeft: "20px", marginBottom: "0px"}}>Trending Book</h2>
            <SlideBooks books = {books}/>
            <h2 style={{marginLeft: "20px", marginBottom: "0px"}}>New Release</h2>
            <SlideBooks books = {books}/>

            <h2 style={{marginLeft: "20px", marginBottom: "0px"}}>List Book</h2>
            <ListBooks1 books = {books}/>
          </div>
        )
        : null
      }
    </div>
  )
};

export default HomePage;

