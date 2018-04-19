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

function createAuthoptions() {
  const options = {};

  options.headers = new Headers({
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  });

  return options;
}

export default {
  facebookLogin,
  fetchMovies
}
