import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const movieCache = {};
let genreList = [];
let genreLastFetched = 0;

export const fetchGenres = async () => {
  const now = Date.now();
  if (genreList.length > 0 && now - genreLastFetched < CACHE_DURATION) {
    return genreList;
  }

  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list`,
    {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US"
      }
    }
  );
  genreList = response.data.genres;
  genreLastFetched = now;
  return genreList;
};

export const fetchMovies = async (
  page = 1,
  genres = "",
  search = "",
  sort = "popularity.desc"
) => {
  const cacheKey = `page=${page}&genres=${genres}&search=${search}&sort=${sort}`;
  const now = Date.now();

  if (
    movieCache[cacheKey] &&
    now - movieCache[cacheKey].timestamp < CACHE_DURATION
  ) {
    return movieCache[cacheKey].data;
  }

  try {
    const genreData = await fetchGenres();

    const isSearchMode = search.trim() !== "";

    const url = isSearchMode
      ? "https://api.themoviedb.org/3/search/movie"
      : "https://api.themoviedb.org/3/discover/movie";

    const params = {
      api_key: TMDB_API_KEY,
      page,
      language: "en-US"
    };

    if (isSearchMode) {
      params.query = search;
    } else {
      if (genres) params.with_genres = genres;
      if (sort) params.sort_by = sort;
    }

    const response = await axios.get(url, { params });

    const results = response.data.results.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (id) => genreData.find((g) => g.id === id)?.name || "Unknown"
      )
    }));

    const data = {
      results,
      total_pages: response.data.total_pages
    };

    movieCache[cacheKey] = {
      timestamp: now,
      data
    };

    return data;
  } catch (error) {
    console.error("Erreur lors du fetch des films :", error.message);
    throw new Error("Failed to fetch movies from TMDb");
  }
};
