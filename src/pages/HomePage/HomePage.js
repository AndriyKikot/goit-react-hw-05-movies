import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/tmdb-api';
import Pagination from '@material-ui/lab/Pagination';
import Status from '../../services/Status';
import Preloader from '../../components/Preloader';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [status, setStatus] = useState(Status.PENDING);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    const fetchMoviesApi = async () => {
      try {
        const { results, total_pages } = await fetchTrendingMovies();
        setTrendingMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };
    fetchMoviesApi();
  }, []);

  return (
    <>
      <h2>Tranding Movies</h2>
      {status === Status.PENDING && <Preloader />}

      {status === Status.REJECTED && error && <p>404</p>}

      {status === Status.RESOLVED && (
        <>
          {trendingMovies &&
            trendingMovies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/:${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          <Pagination
            count={totalPages}
            // onChange={onPageChange}
            // page={Number(page)}
            showFirstButton
            showLastButton
          />
        </>
      )}
    </>
  );
}

export default HomePage;
