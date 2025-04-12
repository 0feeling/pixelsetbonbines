// src/components/Filters.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

const Filters = ({ categories, contentType = "movies" }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Récupération des paramètres actuels
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "popularity";

  // Met à jour un paramètre donné dans l'URL
  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="filters">
      <h3>Filter Options</h3>

      {/* Moteur de recherche */}
      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => handleParamChange("search", e.target.value)}
          placeholder={`Search ${contentType} by title...`}
        />
      </div>

      {/* Filtre par catégorie */}
      <div className="filter-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleParamChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Tri des résultats */}
      <div className="filter-group">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => handleParamChange("sort", e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
