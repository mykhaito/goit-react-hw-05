import { useEffect, useState } from "react";
import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const API_KEY = "689572509e575407e4e0662a5d37d1d5";
const MOVIE_URL = "https://api.themoviedb.org/3/movie";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${MOVIE_URL}/${movieId}?api_key=${API_KEY}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.flex}>
      <button onClick={() => navigate(location.state?.from || "/movies")}>
        Go back
      </button>
      <div className={styles.flextwo}>
        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className={styles.overflex}>
          <h1 className={styles.header}>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <h2>Genres </h2>
          <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.flexthree}>
        <p className={styles.additional}>Additional information</p>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
