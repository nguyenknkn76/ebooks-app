import Banner from "../../components/BookComps/Banner/Banner";
import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
import ListBooks2 from "../../components/BookComps/ListBooks2/ListBooks2";
import SlideBooks from "../../components/BookComps/Slide/SlideBooks";
import data from "../../sample-data/data";
const HomePage = () => {
  return(
    <div>
      <Banner books = {data.books3}/>
      <SlideBooks books = {data.books6}/>
      <ListBooks1 books = {data.books6}/>
      <ListBooks2 books = {data.books6}/>
      {/* <ListBooks1 books={data.books6} /> */}

    </div>
  )
};

export default HomePage;

