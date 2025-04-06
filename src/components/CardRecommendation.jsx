import React from "react";

const CardRecommendation = ({ item }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {item.description || "No description available."}
      </p>

      <div className="mt-3 text-sm text-gray-700 space-y-1">
        {item.genre && (
          <p>
            <strong>Genre:</strong> {item.genre}
          </p>
        )}
        {item.reason && (
          <p>
            <strong>Why:</strong> {item.reason}
          </p>
        )}
        {item.match && (
          <p>
            <strong>Similarity:</strong> {item.match}%
          </p>
        )}
      </div>
    </div>
  );
};

export default CardRecommendation;
