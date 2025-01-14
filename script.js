const BASE_URL = "https://api.themoviedb.org/3";

const moviesContainer = document.getElementById("movie-card");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");

const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    // console.log(response.data)
    const data = await response.json();
    // console.log(data);
    data.results.forEach((media) => {
      const movieCard = creatMovieCard(media);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
  }
};

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

fetchPopularMovies();

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  console.log(query);



  if (query) {
    fetchPopularMovies(query);
  } else {
    alert("Please enter a search term!");
  }
});

function fetchSearchMovies(query) {