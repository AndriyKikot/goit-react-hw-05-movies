import MoviesListItem from './MoviesListItem';
import PropTypes from 'prop-types';

import styles from './MoviesList.module.css';

const MoviesList = ({ movies, url }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ title, poster_path, id, vote_average }) => (
        <MoviesListItem
          key={id}
          title={title}
          id={id}
          poster_path={poster_path}
          url={url}
          vote_average={vote_average}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
