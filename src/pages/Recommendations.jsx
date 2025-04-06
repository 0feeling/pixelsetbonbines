import React, { useState } from "react";

const Recommendations = () => {
  const [selection, setSelection] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecommendation = async () => {
    if (!selection) return;

    setLoading(true); // Démarrer le chargement
    setError(null); // Réinitialiser les erreurs précédentes

    try {
      const response = await fetch(
        `http://localhost:5000/api/recommandations?query=${selection}`
      );

      // Vérification de la réponse
      if (!response.ok) {
        throw new Error("Erreur de réponse de l'API: " + response.statusText);
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des recommandations :",
        error
      );
      setError("Il y a eu un problème avec l'API de recommandation.");
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Obtiens une recommandation</h1>

      {/* Sélection du jeu ou du film */}
      <input
        type="text"
        placeholder="Entre un jeu ou un film..."
        value={selection || ""}
        onChange={(e) => setSelection(e.target.value)}
        className="p-2 border rounded w-full"
      />

      {/* Bouton pour envoyer la requête */}
      <button
        onClick={handleRecommendation}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={loading} // Désactiver le bouton pendant le chargement
      >
        {loading ? "Chargement..." : "Recommander"}
      </button>

      {/* Affichage des recommandations */}
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}

        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((item, index) => (
              <li key={index} className="border p-2 my-2 rounded">
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune recommandation pour l’instant.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
