// src/pages/Games.jsx
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
    <div>
      <h1>Games</h1>
      <div className="grid grid-cols-3 gap-4">
        {games.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Games;
