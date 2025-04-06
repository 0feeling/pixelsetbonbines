// services/api.js

// Utilisation des variables d'environnement avec le préfixe VITE_
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchGames = async (page = 1, pageSize = 10) => {
  // Construction de l'URL avec la clé API et les paramètres de page
  const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`;

  // Log de l'URL pour déboguer
  console.log("Making request to: ", url);

  try {
    const response = await fetch(url); // Appel de l'API RAWG
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des jeux");
    }
    const data = await response.json(); // Récupération des données
    console.log("Data fetched from RAWG API: ", data); // Log des données récupérées
    return data;
  } catch (error) {
    console.error("Error in fetchGames: ", error); // Log de l'erreur
    throw error; // Relance de l'erreur
  }
};

export const fetchMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films");
  }
  const data = await response.json();
  return data;
};
