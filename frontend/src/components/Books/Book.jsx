import React from "react";

const bookData = {
  title: "Variation: A Novel",
  author: "Rebecca Yarros",
  ratings: 4.7,
  reviews: 101,
  description: `
    From the #1 New York Times bestselling author of Fourth Wing comes a new contemporary romance about the summer a celebrated dancer returns home and unearths years of family secrets and deep regrets with the Coast Guard rescue swimmer she never forgot.
    Elite ballerina Allie Rousseau is no stranger to pressure. With her mother’s eyes always watching, perfection was expected, no matter the cost. But when an injury jeopardizes all she’s sacrificed for, Allie returns to her summer home to heal and recover. But the memories she’s tried to forget rush in and threaten to take her under.
    `,
  publisher: "Montlake",
  publicationDate: "November 19, 2024",
  language: "English",
  fileSize: "6318 KB",
  printLength: "459 pages",
  image: "link_to_image",
};

const BookDetail = () => {
  const {
    title,
    author,
    ratings,
    reviews,
    description,
    publisher,
    publicationDate,
    language,
    fileSize,
    printLength,
    image,
  } = bookData;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-60 h-80 object-cover rounded"
        />
      </div>

      <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">by {author}</p>

        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg">★</span>
          <p className="ml-1 text-lg font-medium">{ratings}</p>
          <p className="ml-2 text-sm text-gray-500">{reviews} ratings</p>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed line-clamp-3">
          {description}
        </p>
        <button className="mt-2 text-blue-500 text-sm">Read more</button>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Print length:</p>
            <p className="text-sm text-gray-600">{printLength}</p>
          </div>
          <div>
            <p className="font-medium">Language:</p>
            <p className="text-sm text-gray-600">{language}</p>
          </div>
          <div>
            <p className="font-medium">Publisher:</p>
            <p className="text-sm text-gray-600">{publisher}</p>
          </div>
          <div>
            <p className="font-medium">Publication date:</p>
            <p className="text-sm text-gray-600">{publicationDate}</p>
          </div>
          <div>
            <p className="font-medium">File size:</p>
            <p className="text-sm text-gray-600">{fileSize}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
