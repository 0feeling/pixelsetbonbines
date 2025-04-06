import fetch from "node-fetch";

export const getGames = async (req, res) => {
  const RAWG_API_KEY = process.env.RAWG_API_KEY; // Assure-toi que la clé API est bien récupérée depuis les variables d'environnement
  if (!RAWG_API_KEY) {
    return res
      .status(500)
      .json({ error: "API key not found in environment variables" });
  }

  const { page = 1, pageSize = 10 } = req.query;

  const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`;

  console.log("Making API request to: ", url); // Log de l'URL générée

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from RAWG API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched games data: ", data); // Log des données récupérées

    res.json(data.results);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch games", details: error.message });
  }
};
