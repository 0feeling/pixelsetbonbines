import React, { useEffect, useState } from "react";
import CardMovie from "../components/CardMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`/api/movies?page=${page}`);
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setMovies(data.results);
          if (typeof data.total_pages === "number" && data.total_pages > 1) {
            setTotalPages(data.total_pages);
          }
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [page]);

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 min-h-screen text-white py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-100">Movies</h1>
        <p className="text-xl text-gray-300 mt-4">
          Discover a selection of movies based on your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {Array.isArray(movies) &&
          movies.map((movie) => <CardMovie key={movie.id} movie={movie} />)}
      </div>

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

export default Movies;
