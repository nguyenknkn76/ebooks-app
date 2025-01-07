// import ListBooks1 from "../../components/BookComps/ListBooks1/ListBooks1";
// import FilterForm from "../../components/SearchComps/FilterForm/FilterForm";
// import data from "../../sample-data/data";

// const AdvancedSearchPage = () => {
//   return (
//     <div>
//       <h2 style={{paddingLeft: '20px'}}>Advanced Search Page</h2>
//       <FilterForm/>
//       {/* <ListBooks1 books={data.books6}/> */}
//     </div>
//   );
// };

// export default AdvancedSearchPage;

import { useEffect, useState } from "react";
import { Spin } from 'antd';
import ListBooks1 from "../../components/bookComps/ListBooks1/ListBooks1";
import BookService from "../../services/BookService";
import "./AdvancedSearchPage.scss";
import FilterForm2 from "../../components/SearchComps/FilterForm2/FilterForm2";

const AdvancedSearchPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const response = await BookService.getAllBooks(filters);
      setBooks(response.books);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanced-search-page">
      <h2>Advanced Search</h2>
      {/* <FilterForm onSearch={handleSearch} /> */}
      <FilterForm2 onSearch={handleSearch} />
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        books && <ListBooks1 books={books} />
      )}
    </div>
  );
};

export default AdvancedSearchPage;