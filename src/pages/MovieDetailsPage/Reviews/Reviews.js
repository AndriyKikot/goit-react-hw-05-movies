import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchMovieReviews } from '../../../services/tmdb-api';
import Status from '../../../services/Status';

import Preloader from '../../../components/Preloader';
import styles from './Reviews.module.css';

const Reviews = movieID => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { results } = await fetchMovieReviews(movieId);
        if (results.length === 0) {
          toast.info("We don't have any reviews for this movie.");
          setStatus(Status.REJECTED);
          return;
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setReviews([]);
        setStatus(Status.REJECTED);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Preloader />}

      {status === Status.REJECTED && error && <p>404</p>}

      {status === Status.RESOLVED && (
        <>
          <ul className={styles}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.item}>
                <p className={styles.authorName}>{author}</p>
                <p className={styles.content}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
