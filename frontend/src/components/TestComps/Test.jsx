import Book from '../BookComps/Book';
import BookDetail from '../BookComps/BookDetail';
import Books from '../BookComps/Books';
import BookPreview from '../BookComps/BookPreview';
import TextFileDisplay from '../TextFileDisplay/TextFileDisplay';
import ListBooks from '../BookComps/ListBooks';
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