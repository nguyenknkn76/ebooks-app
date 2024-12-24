import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
import FilterForm from "../../components/SearchComps/FilterForm/FilterForm";
import data from "../../sample-data/data";

const AdvancedSearchPage = () => {
  return (
    <div>
      <h1>Advanced Search Page</h1>
      <FilterForm/>
      <ListBooks1 books={data.books6}/>
    </div>
  );
};

export default AdvancedSearchPage;