import { fetchMovies } from "../services/movieService.js";

export const getMovies = async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const data = await fetchMovies(page);
    console.log("Data sent to frontend:", {
      resultsLength: data.results?.length,
      totalPages: data.total_pages
    });
    res.json(data); // renvoie { results: [...], total_pages: ... }
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ message: "Unable to fetch movies" });
  }
};
