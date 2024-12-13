import Book from '../Books/Book';
import BookDetail from '../Books/BookDetail';
import Books from '../Books/Books';
import BookPreview from '../Books/BookPreview';
import TextFileDisplay from '../TextFileDisplay/TextFileDisplay';
import ListBooks from '../Books/ListBooks';
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