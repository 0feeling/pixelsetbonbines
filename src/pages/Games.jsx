import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import CardGame from "../components/CardGame";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const pageSize = 10; // Taille de la page

  useEffect(() => {
    const getGames = async () => {
      const gameData = await fetchGames(page);
      console.log("Game data:", gameData);

      // Mettre à jour les jeux et le nombre de pages
      setGames(gameData.results);

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(gameData.count / pageSize);
      setTotalPages(totalPages);
    };

    getGames();
  }, [page]); // Recharger les jeux lorsque la page change

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Passer à la page suivante
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Passer à la page précédente
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 min-h-screen text-white py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-100">Games</h1>
        <p className="text-xl text-gray-300 mt-4">
          Explore and discover your next favorite game.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {games.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination mt-8 flex justify-center items-center gap-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
        >
          Previous
        </button>
        <span className="text-lg text-gray-100">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Games;
