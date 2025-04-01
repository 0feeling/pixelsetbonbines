import { fetchGames } from "../services/gameService.js";

const getGames = async (req, res) => {
  try {
    const games = await fetchGames();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Unable to fetch games" });
  }
};

export { getGames };
