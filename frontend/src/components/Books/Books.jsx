import React from "react";

const booksData = [
  {
    title: "Variation: A Novel",
    author: "Rebecca Yarros",
    reviews: 101,
    price: "$4.99",
    kindleUnlimited: true,
    image: "link_to_image_1",
  },
  {
    title: "How My Neighbor Stole Christmas",
    author: "Meghan Quinn",
    reviews: 7098,
    price: "$5.99",
    kindleUnlimited: true,
    image: "link_to_image_2",
  },
  {
    title: "Broken Harbor",
    author: "Catherine Cowles",
    reviews: 553,
    price: "$4.99",
    kindleUnlimited: true,
    image: "link_to_image_3",
  },
];

const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-60">
      <img
        src={book.image}
        alt={book.title}
        className="h-60 w-full object-cover rounded"
      />
      <div className="mt-4">
        {book.kindleUnlimited && (
          <div className="text-xs text-orange-500 font-bold">
            Kindle Unlimited
          </div>
        )}
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-400">{book.reviews} reviews</p>
        <p className="text-lg font-bold mt-2">{book.price}</p>
      </div>
    </div>
  );
};

const Books = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {booksData.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default Books;
