// src/pages/Games.jsx
import React, { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import CardGame from "../components/CardGame";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gameData = await fetchGames();
      setGames(gameData);
    };

    getGames();
  }, []);

  return (
    <div>
      <h1>Games</h1>
      <div className="grid grid-cols-3 gap-4">
        {games.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;
