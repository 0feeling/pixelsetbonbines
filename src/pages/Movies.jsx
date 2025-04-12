import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "popularity";
  const page = searchParams.get("page") || 1; // Vous pouvez ajouter une pagination ici si nécessaire

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/movies", {
          params: {
            page,
            genres: selectedCategory,
            search: searchQuery,
            sort: selectedSort
          }
        });
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/genres");
        const genreNames = res.data.map((genre) => genre.name);
        setCategories(genreNames);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchData();
    fetchCategories();
  }, [searchQuery, selectedCategory, selectedSort, page]); // Ajout des dépendances pour réagir aux changements

  // 🔍 Filtrage dynamique des films
  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(searchQuery))
    .filter((movie) =>
      selectedCategory ? movie.genres.includes(selectedCategory) : true
    )
    .sort((a, b) => {
      if (selectedSort === "release_date") {
        return new Date(b.release_date) - new Date(a.release_date);
      }
      if (selectedSort === "rating") {
        return b.vote_average - a.vote_average;
      }
      // Default: popularity
      return b.popularity - a.popularity;
    });

  return (
    <div className="movies-page">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>

      <Filters categories={categories} contentType="movies" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 text-white p-4 rounded-xl">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-sm">{movie.release_date}</p>
            <p className="text-xs text-gray-400 mt-1">
              {movie.genres.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
