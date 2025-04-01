import express from "express"; // Importation avec ES6 import
import { getGames } from "../controllers/gameController.js"; // Importation de la fonction getGames

const router = express.Router();

// Route pour récupérer les jeux
router.get("/", getGames);

export default router; // Exportation avec ES6 export
