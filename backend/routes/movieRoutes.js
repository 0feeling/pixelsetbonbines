import express from "express";
import { fetchMovies, fetchGenres } from "../services/movieService.js";

const router = express.Router();

// Route pour récupérer les films
router.get("/movies", async (req, res) => {
  try {
    const { page, genres, search, sort } = req.query;
    const movies = await fetchMovies(page, genres, search, sort);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les genres
router.get("/genres", async (req, res) => {
  try {
    const genres = await fetchGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
