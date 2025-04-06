// src/components/Filters.jsx
import React, { useState, useEffect } from "react";

const Filters = ({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  searchQuery
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Fonction pour gérer le changement de recherche
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(value); // Met à jour le searchQuery dans le parent
  };

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onCategoryChange(category); // Met à jour la catégorie dans le parent
  };

  // Fonction pour gérer le changement de tri
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    onSortChange(sortBy); // Met à jour l'ordre de tri dans le parent
  };

  return (
    <div className="filters">
      <h3>Filter Options</h3>

      {/* Moteur de recherche */}
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={localSearchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />
      </div>

      {/* Filtre par catégorie */}
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
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
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={selectedSort} onChange={handleSortChange}>
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
