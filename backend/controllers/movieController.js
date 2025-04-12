// backend/controllers/movieController.js
import { fetchMovies, fetchGenres } from "../services/movieService.js";

export const getMovies = async (req, res) => {
  const {
    page = 1,
    genres = "",
    search = "",
    sort = "popularity.desc"
  } = req.query;

  try {
    const data = await fetchMovies(page, genres, search, sort);
    console.log("Data sent to frontend:", {
      resultsLength: data.results?.length,
      totalPages: data.total_pages
    });
    res.json(data);
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ message: "Unable to fetch movies" });
  }
};

export const getGenres = async (req, res) => {
  try {
    const genres = await fetchGenres();
    res.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    res.status(500).json({ message: "Unable to fetch genres" });
  }
};
