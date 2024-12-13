const books = [
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100", // Thay bằng URL ảnh thực tế
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
];
const bookData = {
  title: "Onyx Storm",
  series: "The Empyrean, Book 3",
  author: "Rebecca Yarros",
  image: "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg",
  length: "14 hrs and 15 mins",
  format: "Unabridged Audiobook",
  releaseDate: "01-21-25",
  language: "English",
  publisher: "Recorded Books",
  credits: 1,
  description:
    "Get ready to fly or die in the breathtaking follow-up to Fourth Wing and Iron Flame from #1 New York Times bestselling author Rebecca Yarros.",
  tags: ["Epic", "Fantasy"],
};

const fileUrl = 'https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/longcontent.txt';

const books2 = [
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Walkable City",
    author: "Jeff Speck",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "The 99% Invisible City",
    author: "Kurt Kohlstedt",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Arbitrary Lines",
    author: "M. Nolan Gray",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "A Pattern Language",
    author: "Christopher Alexander",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "Escaping the Housing Trap",
    author: "Charles L. Marohn",
    cover_image: "https://via.placeholder.com/100",
  },
  {
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
];


export default {bookData, fileUrl, books, books2};