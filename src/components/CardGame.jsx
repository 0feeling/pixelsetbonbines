import React from "react";

const CardGame = ({ game }) => {
  // Extraction des informations supplémentaires du jeu
  const genres = game.genres
    ? game.genres.map((genre) => genre.name).join(", ")
    : "N/A";
  const rating = game.rating ? game.rating.toFixed(1) : "N/A";
  const platforms = game.platforms
    ? game.platforms.map((platform) => platform.name).join(", ")
    : "N/A";
  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString()
    : "N/A";

  return (
    <div
      key={game.id}
      className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow"
    >
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`}
        alt={game.name}
        className="w-full h-auto rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{game.name}</h3>

      {/* Informations supplémentaires */}
      <div className="mt-3 text-sm text-gray-600">
        <p>
          <strong>Genres:</strong> {genres}
        </p>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
        <p>
          <strong>Platforms:</strong> {platforms}
        </p>
        <p>
          <strong>Release Date:</strong> {releaseDate}
        </p>
      </div>
    </div>
  );
};

export default CardGame;
