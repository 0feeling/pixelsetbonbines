import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardGame from "../components/CardGame";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const cacheRef = useRef({}); // Cache des pages déjà chargées

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      // Si les jeux sont déjà en cache, les utiliser
      if (cacheRef.current[page]) {
        console.log("✅ Frontend: Données servies depuis le cache");
        setGames(cacheRef.current[page].results);
        setTotalPages(cacheRef.current[page].totalPages);
        setLoading(false);
        return;
      }

      try {
        console.log(
          `Fetching games for page ${page} with pageSize ${pageSize}`
        );

        const res = await axios.get(`/api/games`, {
          params: {
            page: page,
            pageSize: pageSize
          }
        });

        console.log("Games API response:", res.data);

        // Check if the response has the expected structure
        if (res.data && res.data.results) {
          const total = Math.ceil((res.data.count || 0) / pageSize);

          // Mise en cache
          cacheRef.current[page] = {
            results: res.data.results,
            totalPages: total || 1
          };

          setGames(res.data.results);
          setTotalPages(total || 1);
          console.log("🔄 Frontend: Données récupérées depuis l'API");
        } else {
          console.error("Unexpected API response format:", res.data);
          setError("Unexpected data format received from the server");
          setGames([]);
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement des jeux :", error);
        setError(`Failed to load games: ${error.message}`);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [page, pageSize]);

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 min-h-screen text-white py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-100">Games</h1>
          <p className="text-xl text-gray-300 mt-4">
            Explore and discover your next favorite game.
          </p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mx-auto max-w-md mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-white">Loading games...</div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-white text-center py-10">No games found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
              {games.map((game) => (
                <CardGame key={game.id} game={game} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination mt-8 flex justify-center items-center gap-8">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1 || loading}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
              >
                Previous
              </button>
              <span className="text-lg text-gray-100">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || loading}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Games;
