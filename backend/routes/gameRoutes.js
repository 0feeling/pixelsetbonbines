import express from "express";
import axios from "axios";

const router = express.Router();
const RAWG_API_KEY = process.env.VITE_RAWG_API_KEY;

// Cache en mémoire
const gameCache = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const cacheKey = `page=${page}&pageSize=${pageSize}`;
  const now = Date.now();

  // Vérifie si on a une version en cache
  if (
    gameCache[cacheKey] &&
    now - gameCache[cacheKey].timestamp < CACHE_DURATION
  ) {
    console.log("✅ Données servies depuis le cache :", cacheKey);
    return res.json(gameCache[cacheKey].data);
  }

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
    );

    // Stocke dans le cache
    gameCache[cacheKey] = {
      timestamp: now,
      data: response.data
    };

    console.log("🔄 Données récupérées de l'API :", cacheKey);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Erreur API RAWG :", error.message);
    res.status(500).json({
      message: "Erreur lors de la récupération des jeux",
      error: error.message
    });
  }
});

export default router;
