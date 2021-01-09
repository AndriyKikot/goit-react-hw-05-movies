import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MoviesListItem.module.css';
import defaultPosterImg from '../../../images/no-img.jpg';

const MoviesListItem = ({ poster_path, id, title, url }) => (
  <li className={styles.listItem}>
    <Link to={{ pathname: `${url}/${id}` }}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultPosterImg
        }
        alt={title}
        className={styles.poster}
      />
      <h3 className={styles.title}>{title}</h3>
    </Link>
  </li>
);

MoviesListItem.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default MoviesListItem;
