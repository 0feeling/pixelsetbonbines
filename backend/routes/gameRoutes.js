import express from "express";
import axios from "axios";

const router = express.Router();
const RAWG_API_KEY = process.env.VITE_RAWG_API_KEY;

router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des jeux",
        error: error.message
      });
  }
});

export default router;
