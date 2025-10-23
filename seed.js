const TITLES = [
  "The Cosmic Journey",
  "Midnight Heist",
  "Silent Echoes",
  "Code Red Dawn",
  "The Last Scroll",
  "Urban Legend",
  "Digital Fortress",
  "Green Horizon",
  "Shadows of the Past",
  "Future's End",
  "The Great Escape",
  "Crimson Tide",
  "Beyond the Stars",
  "The Time Paradox",
  "River of Dreams",
  "The Forgotten City",
];

const DIRECTORS = [
  "Ava Chen",
  "Ben Carter",
  "Mia Reyes",
  "Liam O'Connell",
  "Sofia Khan",
  "David Lee",
  "Elena Petrova",
  "Jamal Nkrumah",
];

const GENRES = [
  "Action",
  "Science Fiction",
  "Thriller",
  "Drama",
  "Comedy",
  "Horror",
  "Adventure",
  "Fantasy",
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createRelevantMovie = (index) => {
  // Select a title from the list, ensuring variety if the list is shorter than 50
  const title = TITLES[index % TITLES.length] + ` (${index})`;

  // Generate a diverse range of years
  const releaseYear = 1990 + (index % 35); // Years between 1990 and 2024

  // Generate a random rating between 6.0 and 9.5
  const rating = (Math.random() * 3.5 + 6.0).toFixed(1);

  return {
    title: title,
    director: getRandom(DIRECTORS),
    releaseYear: releaseYear,
    genres: getRandom(GENRES),
    rating: parseFloat(rating), // Store as a number
  };
};

const movieData = Array.from({ length: 50 }, (_, i) =>
  createRelevantMovie(i + 1)
);