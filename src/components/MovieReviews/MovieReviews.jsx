import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "689572509e575407e4e0662a5d37d1d5";
const MOVIE_URL = "https://api.themoviedb.org/3/movie";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${MOVIE_URL}/${movieId}/reviews?api_key=${API_KEY}`)
      .then(response => setReviews(response.data.results))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!reviews.length) return <p>We dont have any reviews</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p><strong>{review.author}:</strong></p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
