// src/pages/Movies.jsx
import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import CardMovie from "../components/CardMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
