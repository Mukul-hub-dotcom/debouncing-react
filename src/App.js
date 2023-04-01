import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'f9f40125';

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const debouncing = setTimeout(() => {
      if (search) {
        setLoading(true);
        try {
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
            .then(response => {
              setMovies(response.data.Search);
              setLoading(false);
            });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setMovies([]);
      }
    }, 1000);
    
    return () => clearTimeout(debouncing);
  }, [search]);

  return (
    <div>
      <input type="text" placeholder="Search movies..." onChange={(event) => setSearch(event.target.value)} />
      {loading && <p>Loading...</p>}
      {!loading && movies.length > 0 &&
        <ul>
          {movies.map(movie => <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>)}
        </ul>
      }
      {!loading && movies.length === 0 && search &&
        <p>No movies found.</p>
      }
    </div>
  );
}

export default App;
