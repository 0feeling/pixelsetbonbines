import React, { useState } from "react";
import CardRecommendation from "../components/CardRecommendation";

const Recommendations = () => {
  const [selection, setSelection] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecommendation = async () => {
    if (!selection) return;

    setLoading(true); // Start loading
    setError(null); // Reset previous errors

    try {
      const query = encodeURIComponent(selection.trim());
      const response = await fetch(
        `http://localhost:5000/api/recommendations?query=${query}`
      );

      // Check the response
      if (!response.ok) {
        throw new Error("API response error: " + response.statusText);
      }

      const data = await response.json();
      console.log("Réponse générée par :", data.source);
      setRecommendations(data.data); // <- ici on prend le tableau réel
    } catch (error) {
      console.error("Error while fetching recommendations:", error);
      setError("There was an issue with the recommendation API.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 min-h-screen text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-100">
          Recommendations
        </h1>
        <p className="text-xl text-gray-300 mt-4">
          Get personalized game and movie recommendations.
        </p>
      </div>

      <div className="max-w-2xl text-black mx-auto px-4 mb-8">
        {/* Game or movie selection */}
        <input
          type="text"
          placeholder="Enter a game or movie..."
          value={selection || ""}
          onChange={(e) => setSelection(e.target.value)}
          className="p-3 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button to submit the request */}
        <button
          onClick={handleRecommendation}
          className="mt-2 p-3 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition duration-300"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Loading..." : "Recommend"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {/* Display recommendations */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <CardRecommendation key={index} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-100">
            No recommendations available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
