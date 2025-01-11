//TMDB API
const API_KEY = "b43a17eab9994823ef36f44adae6dc76"; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
  }
};

fetchPopularMovies();
