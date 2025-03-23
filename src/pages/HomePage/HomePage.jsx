import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css"

const API_KEY = "689572509e575407e4e0662a5d37d1d5";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(TRENDING_URL).then(response => setMovies(response.data.results)).catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1 className={styles.header}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;