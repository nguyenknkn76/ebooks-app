import TextFileDisplay from '../TextDisplayComps/TextFileDisplay';
import ListBooks from '../BookComps/ListBooks1/ListBooks1';
import data from '../../sample-data/data'
import Banner from '../BookComps/Banner/Banner';
import ItemBook2 from '../BookComps/ListBooks2/ItemBook2';
import ListBooks2 from '../BookComps/ListBooks2/ListBooks2';
import SlideBooks from '../BookComps/Slide/SlideBooks';
import BookInfo from '../BookComps/Info/BookInfo';
import ChapterList from '../ChapterComps/ChapterList/ChapterList';
import RatingItem from '../RatingComps/RatingList/RatingItem';
import RatingList from '../RatingComps/RatingList/RatingList';
import RatingForm from '../RatingComps/RatingForm/RatingForm';
import AudioControl from '../AudioComps/AudioControl/AudioControl';
import LoginForm from '../AuthComps/LoginForm/LoginForm';
import RegisterForm from '../AuthComps/RegisterForm/RegisterForm';
import CommentItem from '../CommentComps/CommentList/CommentItem';
import CommentList from '../CommentComps/CommentList/CommentList';
import FilterForm from '../SearchComps/FilterForm/FilterForm';
import AudioCustom from '../AudioComps/AudioCustom/AudioCustom';
import React from 'react';
import CommentForm from '../CommentComps/CommentForm/CommentForm';
import GenreBox from '../GenresComps/GenreBox/GenreBox';
import UpdateProfileForm from '../UserComps/UserInfoForm/UpdateProfileForm';
import Card from '../StatComps/Card/Card';
import LineChart from '../StatComps/Chart/LineChart';
import ListCards from '../StatComps/Card/ListCards';

const Test = () => {
  const books = data.books;
  const bookData = data.bookData;
  const fileUrl = data.fileUrl;
  const books2 = data.books2;
  const handleRatingSubmit = (data) => {
    console.log("Rating Submitted:", data);
  };

  const handleBack = () => {
    console.log("Go Back");
  };
  console.log(fileUrl)
  return(
    <div>
      <ListCards/>
      <LineChart />
      {/* <Card cardInfo={data.cardInfo}/> */}
      <UpdateProfileForm/>

      this is audio custom
      <AudioCustom/>

      this is genre box
      {/* <GenreBox genres = {data.genres}/> */}
      
      this is filter form
      <FilterForm/>

      this is comment form
      <CommentForm/>

      this is comment list
      <CommentList comments = {data.comments}/>

      this is comment Item
      <CommentItem comment1 = {data.comment}/>

      this is register form
      <RegisterForm/>

      this is login form
      <LoginForm/>
      this is audio control
      <AudioControl/>

      this is rating form
      <RatingForm onSubmit={handleRatingSubmit} onBack={handleBack} />

      this is rating list
      <RatingList ratings = {data.ratings}/>
    
      this is rating Item
      <RatingItem rating1 = {data.rating1}/>

      this is chapter list
      <ChapterList chapters = {data.chapters2}/>
    
      this is book book info
      <BookInfo book = {data.book1}/>

      this is slide
      <SlideBooks books = {data.books6}/>

      this is banner
      <Banner books = {data.books3}/>
      
      {/* this is test components
      <BookDetail book={bookData} />
       */}
      this is text file display
      <TextFileDisplay fileUrl={fileUrl}/>
      
      <h2>this is List Books</h2>
      {/* <ListBooks books={books2} /> */}
      <ListBooks books={data.books2} />

      this is item book2
      <ItemBook2 book = {data.book1}/>

      <h2>this is list books 2</h2>
      <ListBooks2 books = {data.books6}/>

    </div>
  )

}

export default Test;