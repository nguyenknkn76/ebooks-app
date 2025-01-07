import React, { useState } from "react";
import { Pagination, Empty } from 'antd';
import PropTypes from "prop-types";
import "./ListBooks1.scss";
import ItemBook1 from "./ItemBook1";

const ListBooks1 = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  if (!books.length) {
    return <Empty description="No books found" />;
  }

  const totalBooks = books.length;
  const currentBooks = books.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="list-books-container">
      <div className="list-books">
        {currentBooks.map((book) => (
          <ItemBook1 key={book.id} book={book} />
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={totalBooks}
        pageSize={pageSize}
        onChange={setCurrentPage}
        className="pagination"
      />
    </div>
  );
};

ListBooks1.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ListBooks1;