import axios from "axios";

const fetchGames = async () => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=10`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

export { fetchGames };
