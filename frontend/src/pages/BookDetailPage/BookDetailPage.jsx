import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../sample-data/data'
import RatingList from '../../components/RatingComps/RatingList/RatingList';
import RatingForm from '../../components/RatingComps/RatingForm/RatingForm';
import ChapterList from '../../components/ChapterComps/ChapterList/ChapterList';
import BookInfo from '../../components/BookComps/Info/BookInfo';
import AudioCustom from '../../components/AudioComps/AudioCustom/AudioCustom';
const BookDetailPage = () => {
  const { id } = useParams();
  const handleRatingSubmit = (data) => {
    console.log("Rating Submitted:", data);
  };

  const handleBack = () => {
    console.log("Go Back");
  };

  return (
    <div>
      <h1>Book Detail Page</h1>
      <p>Book ID: {id}</p>
      <BookInfo book = {data.book1}/>
      <AudioCustom/>
      <ChapterList chapters = {data.chapters2}/>
      <RatingForm onSubmit={handleRatingSubmit} onBack={handleBack} />
      <RatingList ratings = {data.ratings}/>

    </div>
  );
};

export default BookDetailPage;