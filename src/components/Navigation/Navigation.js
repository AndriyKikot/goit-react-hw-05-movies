import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Home
    </NavLink>

    <NavLink
      exact
      to="/movies"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Movies
    </NavLink>

    <NavLink
      exact
      to="/movies/:movieId"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      О фильме
    </NavLink>

    <NavLink
      exact
      to="/movies/:movieId/cast"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Актёры
    </NavLink>

    <NavLink
      exact
      to="/movies/:movieId/reviews"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Обзор
    </NavLink>
  </nav>
);

export default Navigation;
