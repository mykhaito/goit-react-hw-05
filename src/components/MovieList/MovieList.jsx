import { Link } from "react-router-dom";
import styles from "./MovieList.module.css"
const MovieList = ({ movies }) => (
  <ul className={styles.nav}>
    {movies.map(movie => (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      </li>
    ))}
  </ul>
);

export default MovieList;