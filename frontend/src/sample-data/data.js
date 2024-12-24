import { FaUserAlt, FaBook } from 'react-icons/fa';
const avatar_default = "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fw6jckbkvw8fc1.png%3Fwidth%3D900%26format%3Dpng%26auto%3Dwebp%26s%3De4938675d0af6b52e7a7cd30420c49b600232a64&rdt=59628";
const img_url = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg";
const img_url2 = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/nan-nan.jpg";
const audio_url = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/river+flows+in+you.mp3";
const txt_url = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/longcontent.txt";
const books = [
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
    title: "City Limits",
    author: "Megan Kimble",
    cover_image: "https://via.placeholder.com/100",
  },
];

const books3 = [
  {
    title: "Higawari Shippo no Ozaki-chan",
    author: "Nakajima Yuichiro",
    cover_image: "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg",
    genre: ["suggestive", "romance"],
    description:
      "A high school girl, Shiho Ozaki, whose tail grows back every day. Invited by her, a senior who visits the PE storage room almost daily finds himself at her mercy.",
  },
  {
    title: "Another Book Title",
    author: "Author 2",
    cover_image: "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/nan-nan.jpg",
    genre: ["comedy", "fantasy"],
    description: 
      "This is another description for a different book. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis enim accusantium, minus quod cupiditate illum porro pariatur aut vitae soluta ut deleniti autem cum nesciunt, sequi illo consequuntur? Beatae, blanditiis.",
  },
];

const books4 = [
  {
    title: "Whimsy Whimsy Witch",
    author: "Author1",
    cover_image: "http://coverimage1.jpg",
    genre: ["Comedy", "Fantasy"],
    description: "This is description 1",
    avg_rating: 4.2,
    number_rating: 120,
    number_views: 15000,
  },
  {
    title: "That One Classmate Makes Me",
    author: "Author2",
    cover_image: "http://coverimage2.jpg",
    genre: ["Drama", "Romance"],
    description: "This is description 2",
    avg_rating: 3.8,
    number_rating: 90,
    number_views: 20000,
  },
];
// https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg

const books5 = Array.from({ length: 100 }, (_, index) => ({
  title: `Book Title ${index + 1}`,
  author: `Author ${index + 1}`,
  cover_image: index % 2 === 0 ? img_url : img_url2,
}));

const book1 = {
  title: "The Last Human",
  cover_image: img_url,
  genre: ["comedy", "fantasy", "action", "drama"],
  description:
    "Zuo Tianchen is the last living human in a mutated zombie-infested city. Just when he was sure he'd died, he finds his soul returned to just before that ill-fated day ten years ago. He swears he'll protect the people important to him this time round and reunite with his past lover. Watch his struggles to survive equipped with his memory of the next ten years!",
  avg_rating: 4.7,
  total_comments: 200,
  total_followers: 22000,
  total_views: 101000,

  status: "Ongoing",
  publisher: "Webnovel",
  release_year: 2021,
  language: "English",
};

const books6 = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  title: `Book Title ${index + 1}`,
  author: `Author ${index + 1}`,
  cover_image: index % 2 === 0 ? img_url : img_url2,
  genre: ["comedy", "fantasy", "action", "drama"],
  description:
    "Zuo Tianchen is the last living human in a mutated zombie-infested city. Just when he was sure he'd died, he finds his soul returned to just before that ill-fated day ten years ago. He swears he'll protect the people important to him this time round and reunite with his past lover. Watch his struggles to survive equipped with his memory of the next ten years!",
  avg_rating: 4.743,
  total_comments: 200,
  total_followers: 22000,
  total_views: 101000,
  status: "Ongoing",
}));


const chapters2 = Array.from({ length: 20 }, (_, index) => ({
  id: `id${index + 1}`,
  name: `Chapter ${index + 1}: The Beginning`,
  chapter_number: index + 1,
}));

const ratings = Array.from({ length: 10 }, (_, index) => ({
  rating: 4,
  review: "This is a review",
  user: {
    name: `User ${index + 1}`,
    cover_image: img_url,
  },
}));

const comments = Array.from({ length: 10 }, (_, index) => ({
  created_at: "2021-06-01T00:00:00.000Z",
  comment: "This is a comment",
  user: {
    profile: {
      name: `User ${index + 1}`,
    },
  },
}));

const chapters1 = [
  {
    name: "Chapter 1: The Beginning",
  },
  {
    name: "Chapter 2: The Middle",
  },
  {
    name: "Chapter 3: The End",
  },
]

const rating1 = {
  rating: 4,
  review: "This is a review",
  user: {
    name: "User 1",
    cover_image: "https://via.placeholder.com/50",
  },
};

const comment = {
  created_at: "2021-06-01T00:00:00.000Z",
  comment: "This is a comment",
  user: {
    profile: {
      name: "User 1",
    },
  },
}

const genres = ["Fantasy", "Action", "Adventure", "Romance", "Action", "Adventure", "Romance", "Action", "Adventure", "Romance", "Action", "Adventure", "Romance", "Action", "Adventure", "Romance", "Action", "Adventure", "Romance"];

const users1 = Array.from({ length: 10 }, (_, index) => ({
  id: `id${index + 1}`,
  username: `username${index + 1}`,
  role: ["Reader"],
  email: `user${index + 1}@gmail.com`,
  profile: {
    phone: "123456789",
    name: `name${index + 1}`,
  },
}));


const users = [
  {
    id: "id1",
    username: "username1",
    role: ["Reader", "Author"],
    email: "user1@mail.com",
    profile: {
      phone: "123456798",
      name: "name1",
    },
  },
  {
    id: "id2",
    username: "username2",
    role: ["Reader"],
    email: "user2@mail.com",
    profile: {
      phone: "987654321",
      name: "name2",
    },
  },
];
const user = {
  avatar_image: "",
  name: "John Doe",
  phone: "+1 234 567 89",
  address: "USA",
  roles: ["Reader"],
  username: "john_doe",
  dob: "2024",
  email: "john_doe@gmail.com",
};

const cardInfo = {
  title: 'Users',
  data: '1500',
  link_text: 'View all users',
  icon: FaUserAlt,
  iconColor: '#000'
};

const cardInfo2 = {
  title: 'Books',
  data: '300',
  link_text: 'View all books',
  icon: FaBook,
  iconColor: '#ff6347'
};

const cardInfos = [cardInfo, cardInfo2, cardInfo, cardInfo2];

const book2 = {
  cover_image: "",
  title: "The Last Human",
  author: "Amazing Works of Fiction",
  genre: ["comedy", "fantasy", "action", "drama"],
  language: "English",
  publish_year: 2021,
  avg_rating: 4.7,
  total_comments: 200,
  total_followers: 22000,
  total_views: 101000,
  status: "Ongoing",
  publisher: "Admin",
  description:
    "Zuo Tianchen is the last living human in a mutated zombie-infested city. Just when he was sure he'd died, he finds his soul returned to just before that ill-fated day ten years ago. He swears he'll protect the people important to him this time round and reunite with his past lover. Watch his struggles to survive equipped with his memory of the next ten years!",
};
const chapters = Array.from({ length: 20 }, (_, index) => ({
  id: `id${index + 1}`,
  chapter_number: index + 1,
  name: `Chapter ${index + 1}: The Beginning`,
}));

const voices1 = [
  {
    id: "id1",
    name: "en-US-Standard-B",
    causual_name: "Alex",
    language: "English",
    device_profile: "Smartphone",
    gender: "Male",
    age: "Adult",
    type: "Basic",
    audio_file: "http://audiofile1.mp3",
  },
  {
    id: "id2",
    name: "en-US-Standard-C",
    causual_name: "Ben",
    language: "English",
    device_profile: "Smartphone",
    gender: "Male",
    age: "Adult",
    type: "Basic",
    audio_file: "http://audiofile2.mp3",
  },
];

const voices = Array.from({ length: 10 }, (_, index) => ({
  id: `id${index + 1}`,
  name: `en-US-Standard-${index + 1}`,
  causual_name: `Voice ${index + 1}`,
  language: "English",
  device_profile: "Smartphone",
  gender: "Male",
  age: "Adult",
  type: "Basic",
  audio_file: audio_url,
}));

const chapter = {
  id: "id1",
  chapter_number: 1,
  name: "The Beginning",
  text_file: txt_url,
};

// http://audiofile1.mp3
export default {
  voices, voices1,
  comment, comments, genres, user,users, users1, cardInfo, cardInfo2,cardInfos, avatar_default,
  rating1, ratings,
  chapters1,chapters2, chapters,chapter,
  bookData, book1, book2,
  fileUrl, 
  books, books2, books3, books4, books5, books6
};

/*

*/