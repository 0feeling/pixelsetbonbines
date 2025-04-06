import { fetchMovies } from "../services/movieService.js";

const getMovies = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query; // Récupérer les paramètres de page et de pageSize
  try {
    const movies = await fetchMovies(page, pageSize);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Unable to fetch movies" });
  }
};

export { getMovies };
