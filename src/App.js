import React, { Component } from 'react';
import './App.css';

import { MovieItem } from './Components/MovieItem';
import { Movies } from './Fixtures';

class App extends Component {

  constructor() {
    super();
    this.movies = Movies;
  }

  render() {
    return (
      <div className="App">
        {this.movies.map((movie) => {
          return <MovieItem key={movie.id} title={movie.title} originalTitle={movie.originalTitle} cover={movie.cover}></MovieItem>
        })}
      </div>
    );
  }
}

export default App;
