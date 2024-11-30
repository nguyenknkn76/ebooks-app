import Book from '../Books/Book';
import BookDetail from '../Books/BookDetail';
import Books from '../Books/Books';
import BookPreview from '../Books/BookPreview';

const Test = () => {
  const bookData = {
    title: "Onyx Storm",
    series: "The Empyrean, Book 3",
    author: "Rebecca Yarros",
    image: "https://via.placeholder.com/150",
    length: "14 hrs and 15 mins",
    format: "Unabridged Audiobook",
    releaseDate: "01-21-25",
    language: "English",
    publisher: "Recorded Books",
    credits: 1,
    description:
      "Get ready to fly or die in the breathtaking follow-up to Fourth Wing and Iron Flame from #1 New York Times bestselling author Rebecca Yarros.",
    tags: ["Epic", "Fantasy"],
  };
  return(
    <div>
      this is test components
      <BookDetail book={bookData} />
    </div>
  )

}

export default Test;