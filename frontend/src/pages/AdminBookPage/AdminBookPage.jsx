import VoiceTable from "../../components/audioComps/VoiceTable/VocieTable";
import BookInfoForm from "../../components/bookComps/BookInfoForm/BookInfoForm";
import BookTable from "../../components/bookComps/BookTable/BookTable";
import ChapterInfoForm from "../../components/chapterComps/ChapterInfoForm/ChapterInfoForm";
import ChapterTable from "../../components/chapterComps/ChapterTable/ChapterTable";
import data from "../../sample-data/data";

const AdminBookPage = () => {
  return (
    <div>
      <h1>AdminBookPage</h1>
      <BookTable books={data.books6}/>
      <BookInfoForm book={data.book1}/>
      <ChapterTable chapters={data.chapters}/>
      <ChapterInfoForm chapter={data.chapter}/>
      <VoiceTable voices={data.voices}/>
    </div>
  );
};

export default AdminBookPage;