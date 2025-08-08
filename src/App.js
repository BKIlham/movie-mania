import './App.css';
import { useEffect, useState } from 'react';
import {getMovieList , searchMovie} from "./api"

const App = () => {
  
  const [popularMovies, setPopularMovies] = useState([]);
  
  useEffect(()=>{
    getMovieList().then((result) => {
      setPopularMovies(result?.results);
    })
  }, [])
  
  const PopularMovieList = () => {
     if (!Array.isArray(popularMovies)) return null;
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img className="movie-image" alt={movie.title} src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`} width={300}/>
          <div className="movie-date">Release :{movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }
  
  const search = async(q) => {
    const query = await searchMovie(q);
    setPopularMovies(query?.results);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Mania</h1>
          <input 
          placeholder='Cari Film Kesayangan...' 
          className="movie-search" 
          onChange={({target}) => search(target.value)}
          />
          <div className="movie-container">
            <PopularMovieList/>
          </div>
      </header>
    </div>
  );
}

export default App;
