import express from "express"; // Importation avec ES6 import
import { getMovies } from "../controllers/movieController.js"; // Importation de la fonction getMovies

const router = express.Router();

// Route pour récupérer les films
router.get("/", getMovies);

export default router; // Exportation avec ES6 export
