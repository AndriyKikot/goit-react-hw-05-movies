import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchMovieCredits } from '../../../services/tmdb-api';
import defaultPosterImg from '../../../images/no-img.jpg';

import Status from '../../../services/Status';

import Preloader from '../../../components/Preloader';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const { cast } = await fetchMovieCredits(movieId);
        if (cast.length === 0) {
          toast.info('No results');
          setStatus(Status.IDLE);
          return;
        }
        setCast(cast);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setCast([]);
        setStatus(Status.REJECTED);
      }
    };
    fetchActors();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Preloader />}

      {status === Status.RESOLVED && (
        <ul className={styles.list}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={styles.actor}>
              <img
                className={styles.photo}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultPosterImg
                }
                alt="actor"
              />
              <p className={styles.name}>{name}</p>
              <p className={styles.character}>{character || 'unknown'}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && error && <p>404</p>}
    </>
  );
};

export default Cast;
