exports.handler = async (event, context) => {
  const fetch = (await import("node-fetch")).default;
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch popular movies" }),
    };
  }
};
