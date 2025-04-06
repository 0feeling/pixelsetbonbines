// src/pages/Movies.jsx
import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import CardMovie from "../components/CardMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const pageSize = 10; // Taille de la page

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies(page);
      console.log("Movie data:", movieData);
      setMovies(movieData.results);

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(movieData.count / pageSize);
      setTotalPages(totalPages);
    };

    getMovies();
  }, [page]); // Recharger les films lorsque la page change

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
      <h1>Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
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

export default Movies;
