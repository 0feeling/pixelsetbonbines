import React from "react";

const CardMovie = ({ movie }) => {
  // Extraction des informations supplémentaires du film
  const genres = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
      <p className="text-sm text-gray-500">{movie.release_date}</p>
      <p className="text-sm text-gray-700 mt-1">{movie.overview}</p>

      {/* Informations supplémentaires */}
      <div className="mt-3 text-sm text-gray-600">
        <p>
          <strong>Genres:</strong> {genres}
        </p>
        <p>
          <strong>Runtime:</strong> {runtime}
        </p>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
      </div>
    </div>
  );
};

export default CardMovie;
