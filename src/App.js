import React, { Component } from 'react';
import './App.css';

import { MovieList } from './Movie';
import { Movies } from './Fixtures';

class App extends Component {

  constructor() {
    super();
    this.movies = Movies;
  }

  render() {
    return (
      <div className="App">
        <MovieList movies={this.movies} />
      </div>
    );
  }
}

export default App;
