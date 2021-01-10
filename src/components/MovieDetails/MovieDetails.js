import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './MovieDetails.module.css';
import defaultPosterImg from '../../images/no-img.jpg';

const MoviesDetails = ({ movie, url, location }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaultPosterImg
          }
          alt={movie.title && movie.original_name}
          width="350px"
          className={styles.poster}
        />
        <div className={styles.description}>
          <h2>
            {movie.title && movie.original_name}
            {movie.title}
            {movie.release_date && (
              <span> ({movie.release_date.slice(0, 4)})</span>
            )}
          </h2>
          <h3 className={styles.title}>Rating</h3>
          <p className={(styles.info, styles.rating)}>{movie.vote_average}</p>
          <h3 className={styles.title}>Overview</h3>
          <p className={styles.info}>{movie.overview}</p>
          <h3 className={styles.title}>
            Genres:
            <ul className={styles.genreList}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </h3>
        </div>
      </div>
      <h3>Additional information</h3>
      <ul className={styles.navigation}>
        <li className={styles.link}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
};

MoviesDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default MoviesDetails;
