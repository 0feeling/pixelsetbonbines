import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext"; // Assurez-vous que le contexte est correctement importé
import CardMovie from "../components/CardMovie"; // Importation des composants de film
import CardGame from "../components/CardGame"; // Importation des composants de jeu

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext); // Accède à la wishlist dans le contexte

  return (
    <div className="wishlist-container p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {/* Affichage de la wishlist */}
      {wishlist.length > 0 ? (
        <div className="wishlist-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) =>
            item.title ? (
              <CardMovie key={item.id} movie={item} /> // Affichage des films
            ) : (
              <CardGame key={item.id} game={item} /> // Affichage des jeux
            )
          )}
        </div>
      ) : (
        <p className="text-gray-500">Your wishlist is empty.</p> // Message si la wishlist est vide
      )}
    </div>
  );
};

export default Wishlist;
