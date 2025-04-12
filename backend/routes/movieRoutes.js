import express from "express";
import { getMovies, getGenres } from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/genres", getGenres);

export default router;
