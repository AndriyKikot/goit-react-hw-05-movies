import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { fetchMovieDetails } from '../../services/tmdb-api';
import Status from '../../services/Status';
import Preloader from '../../components/Preloader';
import MovieDetails from '../../components/MovieDetails';
import ErrorText from '../../components/ErrorText';

const Cast = lazy(() =>
  import('./Cast/Cast' /* webpackChunkName: "castSubview"*/),
);

const Reviews = lazy(() =>
  import('./Reviews/Reviews' /* webpackChunkName: "reviewsSubview"*/),
);

function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesID = async () => {
      try {
        const result = await fetchMovieDetails(movieId);
        setMovie(result);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };

    fetchMoviesID();
  }, [movieId]);

  const comeBackHandler = () => {
    if (!location.state) {
      history.push('/');
      return;
    }
    history.push({ ...location.state.from });
  };

  return (
    <>
      {status === Status.PENDING && <Preloader />}

      {status === Status.RESOLVED && (
        <div>
          <Button
            onClick={comeBackHandler}
            variant="outlined"
            color="primary"
            style={{ backgroundColor: '#f0f0f0' }}
          >
            Сome back
          </Button>
          <MovieDetails movie={movie} url={url} location={location} />
          <Suspense fallback={<Preloader />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <Cast />}
            </Route>
            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Reviews />}
            </Route>
          </Suspense>
        </div>
      )}

      {status === Status.REJECTED && error && (
        <>
          <ErrorText message={error} />
          <p>404</p>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
