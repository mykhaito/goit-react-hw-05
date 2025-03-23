import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css"

const API_KEY = "689572509e575407e4e0662a5d37d1d5";
const MOVIE_URL = "https://api.themoviedb.org/3/movie";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${MOVIE_URL}/${movieId}/credits?api_key=${API_KEY}`)
      .then(response => setCast(response.data.cast))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            <img className={styles.imgg} src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
