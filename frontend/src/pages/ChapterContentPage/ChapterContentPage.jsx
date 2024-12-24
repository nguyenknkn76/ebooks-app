import { useParams } from "react-router-dom";
import TextFileDisplay from "../../components/TextDisplayComps/TextFileDisplay";
import data from "../../sample-data/data";
import AudioControl from "../../components/AudioComps/AudioControl/AudioControl";
import CommentList from "../../components/CommentComps/CommentList/CommentList";
import CommentForm from "../../components/CommentComps/CommentForm/CommentForm";
const ChapterContentPage = () => {
  const {id} = useParams();

  return (
    <div>
      <h1>ChapterContentPage</h1>
      <p>Chapter id: {id}</p>
      <AudioControl/>
      <TextFileDisplay fileUrl={data.fileUrl}/>
      <CommentForm/>
      <CommentList comments = {data.comments}/>

    </div>
  );
};

export default ChapterContentPage;