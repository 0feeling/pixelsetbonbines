const API_URL = "http://localhost:5000"; //l'URL du backend

export const fetchMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  const data = await response.json();
  return data;
};

export const fetchGames = async () => {
  const response = await fetch(`${API_URL}/games`);
  const data = await response.json();
  return data;
};
