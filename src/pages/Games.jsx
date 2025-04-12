import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardGame from "../components/CardGame";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const cacheRef = useRef({}); // Cache des pages déjà chargées

  useEffect(() => {
    const fetchGames = async () => {
      // Si les jeux sont déjà en cache, les utiliser
      if (cacheRef.current[page]) {
        console.log("✅ Frontend: Données servies depuis le cache");
        setGames(cacheRef.current[page].results);
        setTotalPages(cacheRef.current[page].totalPages);
        return;
      }

      try {
        const res = await axios.get(
          `/api/games?page=${page}&pageSize=${pageSize}`
        );
        const total = Math.ceil(res.data.count / pageSize);

        // Mise en cache
        cacheRef.current[page] = {
          results: res.data.results,
          totalPages: total
        };

        setGames(res.data.results);
        setTotalPages(total);
        console.log("🔄 Frontend: Données récupérées depuis l'API");
      } catch (error) {
        console.error("❌ Erreur lors du chargement des jeux :", error.message);
      }
    };

    fetchGames();
  }, [page]);

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
