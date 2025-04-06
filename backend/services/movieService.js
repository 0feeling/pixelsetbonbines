import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const fetchMovies = async (page = 1) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      page
    }
  });

  // ici, on retourne tout : { results, total_pages, total_results, ... }
  return response.data;
};
