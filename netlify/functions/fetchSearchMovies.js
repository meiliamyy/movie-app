const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/search/movie";

  // Extract the search query parameter
  const query = event.queryStringParameters.query;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No query parameter provided" }),
    };
  }

  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch search results" }),
    };
  }
};
