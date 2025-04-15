import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMovie from "../components/CardMovie";
import Filters from "../components/Filters";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "popularity.desc"; // Changed to match backend
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching movies with params:", {
          page,
          genres: selectedCategory,
          search: searchQuery,
          sort: selectedSort
        });

        // Use the correct endpoint based on your routes
        const res = await axios.get("/api/movies", {
          params: {
            page,
            genres: selectedCategory,
            search: searchQuery,
            sort: selectedSort
          }
        });

        console.log("Movies API response:", res.data);

        if (res.data && res.data.results) {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages || 1);
        } else {
          setMovies([]);
          setError("No movies data found");
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        // Use the correct endpoint based on your routes
        const res = await axios.get("/api/movies/genres");
        console.log("Genres API response:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setGenres(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchMoviesData();
    fetchGenres();
  }, [searchQuery, selectedCategory, selectedSort, page]);

  // Extract genre names for the filters component
  const genreNames = genres.map((genre) => genre.name);

  return (
    <div className="movies-page bg-gray-900 min-h-screen p-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Movies
        </h2>

        <Filters categories={genreNames} contentType="movies" />

        {error && (
          <div className="bg-red-500 text-white p-3 rounded my-4">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-white">Loading movies...</div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-white text-center py-10">
            No movies found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {movies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination mt-8 flex justify-center items-center gap-8">
              <button
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
              >
                Previous
              </button>
              <span className="text-lg text-gray-100">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-500"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
