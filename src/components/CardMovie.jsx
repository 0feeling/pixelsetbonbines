import React from "react";

const CardMovie = ({ movie }) => {
  const genres = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
      <p className="text-sm text-gray-500">{movie.release_date}</p>
      <p className="text-sm text-gray-700 mt-2">{movie.overview}</p>

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
