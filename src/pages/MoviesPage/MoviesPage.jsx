import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";

const API_KEY = "689572509e575407e4e0662a5d37d1d5";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(`${SEARCH_URL}?api_key=${API_KEY}&query=${query}`)
      .then(response => setMovies(response.data.results))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;