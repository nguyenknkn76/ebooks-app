import { FaUserAlt, FaBook, FaUser } from 'react-icons/fa';
import { MdKeyboardVoice } from "react-icons/md";
// const faker = require('faker');

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
const fileUrl2 = 'https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/Davin+Ci+Code.txt'
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
  title: "Davin Ci Code",
  cover_image: img_url,
  genre: ["comedy", "fantasy", "action", "drama"],
  description:
    "Zuo Tianchen is the last living human in a mutated zombie-infested city. Just when he was sure he'd died, he finds his soul returned to just before that ill-fated day ten years ago. He swears he'll protect the people important to him this time round and reunite with his past lover. Watch his struggles to survive equipped with his memory of the next ten years!",
  avg_rating: 4.7,
  likes: 4.7,
  total_comments: 10,
  total_followers: 2,
  total_views: 25,

  status: "Ongoing",
  author: "Dan Brown",
  release_year: 2021,
  language: "English",
};

const bookTitles = [
  'Zhāng Ruò Nán',
  'I Love Cat',
  "The Secret Beneath the Leaves",
  "Journey Through Time",
  "Mysteries of the Ocean",
  "The Mars Code",
  "Diary of an Explorer",
  "Autumn Love Story",
  "Exploring the Universe",
  "Legends of the Misty Mountains",
  "The Adventures of a Little Girl",
  "Memories of a Stranger"
];

const authors = [
  "J.K. Rowling",
  "George R.R. Martin",
  "J.R.R. Tolkien",
  "Stephen King",
  "Agatha Christie",
  "Isaac Asimov",
  "Arthur Conan Doyle",
  "Haruki Murakami",
  "Jane Austen",
  "Mark Twain"
];
const genres2 = ["comedy", "fantasy", "action", "drama", "horror", "mystery", "romance", "sci-fi", "thriller", "historical"];

const urlsList = [
  'https://th.bing.com/th/id/OIP.brfi9qy1S2fi3zmucOUEsgHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.RJtRSS50r--9dPOfq7IWWgHaLH?w=121&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.xhNEdJgiampQgzIt8I7PMwHaKX?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.52fs8N17u8T5CnxJ49xrnAHaLI?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://images.thenile.io/r1000/9780552159722.jpg',
  'https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg',
  'https://th.bing.com/th/id/OIP.3LczOKGWJPgRudN84_viVQHaJQ?rs=1&pid=ImgDetMain',
  "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg",
  "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/nan-nan.jpg",

]
// const img_url = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/example-cat-2.jpg";
// const img_url2 = "https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/nan-nan.jpg";
function getRandomAuthor() {
  const randomIndex = Math.floor(Math.random() * authors.length);
  return authors[randomIndex];
}

function getRandomUrl() {
  const randomIndex = Math.floor(Math.random() * urlsList.length);
  return urlsList[randomIndex];
}
function getRandomGenres() {
  const numberOfGenres = Math.floor(Math.random() * 3) + 1; // Số lượng thể loại ngẫu nhiên, ít nhất là 1 và nhỏ hơn 4
  const selectedGenres = [];

  while (selectedGenres.length < numberOfGenres) {
    const randomGenre = genres2[Math.floor(Math.random() * genres2.length)];
    if (!selectedGenres.includes(randomGenre)) {
      selectedGenres.push(randomGenre);
    }
  }

  return selectedGenres;
}


function getRandomTitle() {
  const randomIndex = Math.floor(Math.random() * bookTitles.length);
  return bookTitles[randomIndex];
}

const books6 = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  // title: `Book Title ${index + 1}`,
  title: getRandomTitle(),
  author: getRandomAuthor(),
  cover_image: index % 2 === 0 ? img_url : img_url2,
  // cover_image: index % 2 === 0 ? img_url : img_url2,
  genre: getRandomGenres(),
  description:
    "Zuo Tianchen is the last living human in a mutated zombie-infested city. Just when he was sure he'd died, he finds his soul returned to just before that ill-fated day ten years ago. He swears he'll protect the people important to him this time round and reunite with his past lover. Watch his struggles to survive equipped with his memory of the next ten years!",
  avg_rating: 4.74,
  total_comments: 12,
  total_followers: 2,
  total_views: 10,
  status: "Ongoing",
}));


const chapters2 = Array.from({ length: 20 }, (_, index) => ({
  id: `id${index + 1}`,
  name: `Chapter ${index + 1}: The Beginning`,
  chapter_number: index + 1,
}));

const ratings = Array.from({ length: 10 }, (_, index) => ({
  created_at: "2021-06-01T00:00:00.000Z",
  rating: 4,
  review: "This is a review",
  user: {
    name: index % 2 === 0 ? `Khoi Nguyen` : `Adam`,
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

const languages = ["English", "Vietnamese"];
const deviceProfiles = ["Smartphone", "Headphone"];
const ages = ["Adult", "Senior", "Child"];
const types = ["Basic", "Neutral2", "WaveNet"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const voices2 = Array.from({ length: 10 }, (_, index) => {
  const language = getRandomItem(languages);
  const locale = language === "English" ? "en-US" : "vi-VN";
  const type = getRandomItem(types);
  let name;
  if (type === "Basic") {
    name = `${locale}-standard-${index + 1}`;
  } else if (type === "Neutral2") {
    name = `${locale}-neutral2-${index + 1}`;
  } else if (type === "WaveNet") {
    name = `${locale}-wavenet-${index + 1}`;
  }
  // console.log(index)
  return {
    id: `voice${index + 1}`,
    name: name, // Tên theo định dạng en-US-standard-X hoặc vi-VN-standard-X
    casual_name: `Voice ${index + 1}`,
    language: language,
    device_profile: getRandomItem(deviceProfiles),
    gender: index % 2 === 0 ? "Male" : "Female",
    age: getRandomItem(ages),
    type: type,
    audio_file: audio_url,

  };
});

// console.log(voices);

const chapter = {
  id: "id1",
  chapter_number: 1,
  name: "The Beginning",
  text_file: txt_url,
};

// const cardInfo2 = {
//   title: 'Books',
//   data: '300',
//   link_text: 'View all books',
//   icon: FaBook,
//   iconColor: '#ff6347'
// };

const cardData = [
  {
    title: "Total Users",
    data: "13",
    link_text: "View all users",
    icon: FaUser,
    iconColor: "black",
  },
  {
    title: "New Users",
    data: "3",
    link_text: "View all users",
    icon: FaUser,
    iconColor: "black",
  },
  {
    title: "Total Books",
    data: "23",
    link_text: "View all books",
    icon: FaBook,
    iconColor: "black",
  },
  {
    title: "Total Voices",
    data: "35",
    link_text: "View all voices",
    icon: MdKeyboardVoice,
    iconColor: "black",
  },
];


// const users2 = Array.from({ length: 10 }, (_, index) => ({
//   id: `id${index + 1}`,
//   username: `username${index + 1}`,
//   role: ["Reader"],
//   email: `user${index + 1}@mail.com`,
//   profile: {
//     phone: faker.phone.phoneNumber(), // Tạo số điện thoại ngẫu nhiên
//     name: faker.name.findName() // Tạo tên ngẫu nhiên
//   }
// }));

console.log(users);
const users3 = [
  {
    id: "id1",
    username: "username1",
    role: ["Reader"],
    email: "user1@mail.com",
    profile: {
      phone: "123456789",
      name: "Alice Johnson"
    }
  },
  {
    id: "id2",
    username: "username2",
    role: ["Reader"],
    email: "user2@mail.com",
    profile: {
      phone: "987654321",
      name: "Bob Smith"
    }
  },
  {
    id: "id3",
    username: "username3",
    role: ["Reader"],
    email: "user3@mail.com",
    profile: {
      phone: "123123123",
      name: "Charlie Brown"
    }
  },
  {
    id: "id4",
    username: "username4",
    role: ["Reader"],
    email: "user4@mail.com",
    profile: {
      phone: "321321321",
      name: "David Wilson"
    }
  },
  {
    id: "id5",
    username: "username5",
    role: ["Reader"],
    email: "user5@mail.com",
    profile: {
      phone: "456456456",
      name: "Eve Davis"
    }
  },
  {
    id: "id6",
    username: "username6",
    role: ["Reader"],
    email: "user6@mail.com",
    profile: {
      phone: "654654654",
      name: "Frank White"
    }
  },
  {
    id: "id7",
    username: "username7",
    role: ["Reader"],
    email: "user7@mail.com",
    profile: {
      phone: "789789789",
      name: "Grace Hall"
    }
  },
  {
    id: "id8",
    username: "username8",
    role: ["Reader"],
    email: "user8@mail.com",
    profile: {
      phone: "987987987",
      name: "Henry Clark"
    }
  },
  {
    id: "id9",
    username: "username9",
    role: ["Reader"],
    email: "user9@mail.com",
    profile: {
      phone: "111222333",
      name: "Ivy Lewis"
    }
  },
  {
    id: "id10",
    username: "username10",
    role: ["Reader"],
    email: "user10@mail.com",
    profile: {
      phone: "444555666",
      name: "Jack Martinez"
    }
  }
];

// console.log(users);

// http://audiofile1.mp3
export default {
  cardData,urlsList,
  voices, voices1, voices2,
  comment, comments, genres, user,users, users1, users3,
  cardInfo, cardInfo2,cardInfos, avatar_default,
  rating1, ratings,
  chapters1,chapters2, chapters,chapter,
  bookData, book1, book2,
  fileUrl, fileUrl2,
  books, books2, books3, books4, books5, books6
};

/*

*/