import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import { fetchTrendingMovies } from '../../services/tmdb-api';
import Status from '../../services/Status';
import Preloader from '../../components/Preloader';
import MoviesList from '../../components/MoviesList';
import ErrorText from '../../components/ErrorText';

import styles from './HomePage.module.css';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    setStatus(Status.PENDING);

    const fetchMoviesApi = async () => {
      try {
        const { results, total_pages } = await fetchTrendingMovies(page);
        setTrendingMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };
    fetchMoviesApi();
  }, [page]);

  const pageHandler = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <>
      <h2>Tranding Movies</h2>

      {status === Status.PENDING && <Preloader />}

      {status === Status.REJECTED && error && (
        <>
          <ErrorText text={error} />
          <p> Nothing found :( </p>
        </>
      )}

      {status === Status.RESOLVED && (
        <>
          <MoviesList movies={trendingMovies} url={'movies'} />
          {totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                className={styles.pagination}
                count={totalPages}
                onChange={pageHandler}
                page={Number(page)}
                variant="outlined"
                color="secondary"
                shape="rounded"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
