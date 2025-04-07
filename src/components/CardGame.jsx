import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext"; // Importer le contexte Wishlist

const CardGame = ({ game }) => {
  const { addToWishlist } = useContext(WishlistContext); // Utiliser le hook pour ajouter à la wishlist
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

  const handleAddToWishlist = () => {
    addToWishlist(game); // Ajouter le jeu à la wishlist
  };

  return (
    <div
      key={game.id}
      className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
    >
      <img
        src={game.background_image || "/placeholder-game.jpg"}
        alt={game.name}
        className="w-full h-auto rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-black">{game.name}</h3>

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

      {/* Ajouter le bouton "Add to Wishlist" */}
      <button
        onClick={handleAddToWishlist}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default CardGame;
