import Book from '../bookComps/Book';
import BookDetail from '../bookComps/BookDetail';
import Books from '../bookComps/Books';
import BookPreview from '../bookComps/BookPreview';
import TextFileDisplay from '../textDisplayComps/TextFileDisplay';
import ListBooks from '../bookComps/ListBooks';
import data from '../../sample-data/data'
const Test = () => {
  const books = data.books;
  const bookData = data.bookData;
  const fileUrl = data.fileUrl;
  const books2 = data.books2;

  console.log(fileUrl)
  return(
    <div>
      this is test components
      <BookDetail book={bookData} />
      
      this is text file display
      <TextFileDisplay fileUrl={fileUrl}/>
      
      this is List Books
      <ListBooks books={books2} />
    </div>
  )

}

export default Test;