import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from '../../sample-data/data'
import RatingList from '../../components/RatingComps/RatingList/RatingList';
import RatingForm from '../../components/RatingComps/RatingForm/RatingForm';
import ChapterList from '../../components/ChapterComps/ChapterList/ChapterList';
import BookInfo from '../../components/BookComps/Info/BookInfo';
import AudioCustom from '../../components/AudioComps/AudioCustom/AudioCustom';
import BookService from '../../services/BookService';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);

  const handleBack = () => {
    console.log("Go Back");
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, chaptersData, ratingsData] = await Promise.all([
          BookService.getBookById(id),
          BookService.getChaptersByBookId(id),
          BookService.getRatingsByBookId(id)
        ]);

        if (!bookData) {
          navigate('/not-found');
          return;
        }

        setBook(bookData);
        setChapters(chaptersData);
        setRatings(ratingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleRatingSubmit = async (ratingData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please login to submit a rating');
        return;
      }

      await BookService.createRating({
        user: user.id,
        book: id,
        star: ratingData.rating,
        review: ratingData.review
      });

      const newRatings = await BookService.getRatingsByBookId(id);
      setRatings(newRatings);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!book) return <div className="not-found">Book not found</div>;

  // console.log(book);
  console.log(ratings);
  // console.log(chapters)
  return (
    <div>
      {/* <h1>Book Detail Page</h1>
      <p>Book ID: {id}</p> */}
      <BookInfo book = {book}/>
      <AudioCustom book = {book}/>
      {chapters &&<ChapterList chapters = {chapters}/>}
      <RatingForm onSubmit={handleRatingSubmit} onBack={handleBack} />
      {ratings && <RatingList ratings = {ratings}/>}
    </div>
  );
};

export default BookDetailPage;