import { fetchMovies } from "../services/movieService.js";

const getMovies = async (req, res) => {
  try {
    const movies = await fetchMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Unable to fetch movies" });
  }
};

export { getMovies };
