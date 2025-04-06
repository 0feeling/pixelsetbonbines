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
        console.log("Fetched movies data:", data);
        console.log("data.total_pages:", data.total_pages);

        console.log("Fetched movies data:", data);

        if (Array.isArray(data)) {
          setMovies(data);
          setTotalPages(1); // valeur par défaut si pas de pagination
        } else if (Array.isArray(data.results)) {
          setMovies(data.results);
          if (typeof data.total_pages === "number" && data.total_pages > 1) {
            setTotalPages(data.total_pages);
          } else {
            console.warn(
              "⚠️ total_pages manquant ou invalide :",
              data.total_pages
            );
          }
        } else {
          console.error("Bad data format:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, [page]);

  return (
    <div>
      <h1>Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(movies) &&
          movies.map((movie) => <CardMovie key={movie.id} movie={movie} />)}
      </div>
      <div className="pagination mt-4 flex items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
