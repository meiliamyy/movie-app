const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

  // Extract the genre ID from the URL query parameters
  const genreId = event.queryStringParameters.genreId;

  if (!genreId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No genre ID provided" }),
    };
  }

  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch movies by genre" }),
    };
  }
};
