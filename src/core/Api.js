const apiBaseUrl = process.env.REACT_APP_API_URL;

async function facebookLogin(code) {
  const facebookLoginResponse = await fetch(`${apiBaseUrl}/security/facebook/${code}`);
  return await facebookLoginResponse.json();
}

async function fetchMovies() {
  const fetchMoviesResponse = await fetch(`${apiBaseUrl}/movies`, createAuthoptions());
  const jsonResponse = await fetchMoviesResponse.json();
  return jsonResponse;
}

async function createMovie(movie) {
  const createMovieResponse = await fetch(`${apiBaseUrl}/movies`, {
    ...createAuthoptions(),
    method: 'POST',
    body: JSON.stringify(movie)
  });
  return await createMovieResponse.json();
}

function createAuthoptions() {
  const options = {};

  options.headers = new Headers({
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  });

  return options;
}

export default {
  facebookLogin,
  fetchMovies,
  createMovie
}
