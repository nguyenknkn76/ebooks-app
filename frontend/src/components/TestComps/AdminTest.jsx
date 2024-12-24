import data from "../../sample-data/data";
import VoiceTable from "../audioComps/VoiceTable/VocieTable";
import BookInfoForm from "../bookComps/BookInfoForm/BookInfoForm";
import BookTable from "../bookComps/BookTable/BookTable";
import ChapterInfoForm from "../chapterComps/ChapterInfoForm/ChapterInfoForm";
import ChapterTable from "../chapterComps/ChapterTable/ChapterTable";
import SideBar from "../common/SideBar/SideBar";
import Card from "../StatComps/Card/Card";
import ListCards from "../StatComps/ListCards/ListCards";
import UserInfoForm from "../UserComps/UserInfoForm/UserInfoForm";
import UserTable from "../UserComps/UserTable/UserTable";

const AdminTest = () => {
  return(
    <div>
      <ChapterInfoForm chapter={data.chapter}/>
      
      voice table
      <VoiceTable voices={data.voices}/>

      chapter table
      <ChapterTable chapters={data.chapters}/>

      <form>
      <input type="file" accept="image/*" />
      </form>
      book info form
      <BookInfoForm book={data.book1}/>
      
      user info form
      <UserInfoForm user={data.user}/>

      card
      <ListCards cardInfos={data.cardInfos}/>
      <Card cardInfo={data.cardInfo}/>
      <Card cardInfo={data.cardInfo2}/>
      book table
      <BookTable books={data.books6}/>

      user table
      <UserTable users={data.users1}/>

      admin test components
      <SideBar/>

    </div>
  )
}

export default AdminTest;