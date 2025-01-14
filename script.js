const API_KEY = "your_api_key"; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;
const genresURL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

const moviesContainer = document.getElementById("movie-card");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const genreListContainer = document.getElementById("genre-list");

// Fetch popular movies
const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    moviesContainer.innerHTML = "";
    data.results.forEach((media) => {
      const movieCard = creatMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
  }
};

// Fetch movies based on search query
const fetchSearchMovies = async (query) => {
  try {
    const response = await fetch(`${searchURL}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    moviesContainer.innerHTML = "";
    data.results.forEach((media) => {
      const movieCard = creatMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching search results from TMDB:", error);
  }
};

// Create movie card
function creatMovieCard(media) {
  const { title, overview, vote_average, backdrop_path } = media;
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie_item");
  movieCard.innerHTML = `
  <div class="movie">
      <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="movie-rating">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
  </div>
    `;
  return movieCard;
}

// Search functionality
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query) {
    fetchSearchMovies(query);
  } else {
    alert("Please enter a search term!");
  }
});

const fetchGenres = async () => {
  try {
    const response = await fetch(genresURL);
    const data = await response.json();
    let genres = data.genres;
    displayGenres(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

const displayGenres = (genres) => {
  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.classList.add("genre-button");
    button.textContent = genre.name;
    button.setAttribute("data-id", genre.id);
    button.addEventListener("click", () => fetchMoviesByGenre(genre.id));
    genreListContainer.appendChild(button);
  });
};

const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    moviesContainer.innerHTML = "";
    data.results.forEach((media) => {
      const movieCard = creatMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  }
};

fetchGenres();
// Load popular movies on page load
fetchPopularMovies();
