import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/tmdb-api';

function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return <>{/* {movies && movies.map(movie => <li key={movie.id}></li>)} */}</>;
}

export default HomePage;
