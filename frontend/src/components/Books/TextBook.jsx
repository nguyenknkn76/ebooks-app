import React from "react";

const TextBook = () => {
  const content = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cum ea eveniet esse! Possimus vero eveniet quisquam obcaecati, asperiores natus illum repellendus. Beatae voluptatibus vero alias quam, maxime sapiente?
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quae soluta commodi unde sed voluptatem sequi eaque numquam. Quaerat voluptate temporibus vero provident ipsum enim excepturi similique quasi id ullam?
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi mollitia nemo, illum voluptas, aut odit iure optio, deserunt at ab ratione qui possimus tempore sequi. Voluptatem sit voluptate suscipit nesciunt!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, perferendis eaque praesentium enim debitis iste numquam tempora! Saepe iste eos possimus a incidunt mollitia. Est voluptas nisi repellendus voluptatem magnam.
  `;

  return (
    <div className="container mx-auto bg-white shadow-lg p-6 rounded-md">
      <div className="header flex items-center justify-between border-b pb-4">
        <div className="breadcrumbs text-gray-600 text-sm">
          <a href="#" className="hover:underline">Truyện</a> /
          <a href="#" className="hover:underline">Tên truyện ở đây nhé</a> /
          <span>Chương</span>
        </div>
        <button className="text-green-500 hover:text-green-600 text-lg">
          <span className="material-icons">settings</span>
        </button>
      </div>

      <h1 className="text-center text-xl font-bold text-green-600 mt-4">
        Tên truyện lại ở đây
      </h1>
      <p className="text-center text-gray-500 text-sm mt-2">
        Tên chapters ở đây nè 
      </p>

      <div className="content mt-6 text-justify leading-7 text-gray-700">
        {content}
      </div>

      <div className="navigation mt-6 flex justify-center gap-4">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          <span className="material-icons">arrow_back</span> Chương trước
        </button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          Chương tiếp <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default TextBook;
