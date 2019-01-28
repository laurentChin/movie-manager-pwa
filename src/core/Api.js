import Cookies from "js-cookie";

const apiBaseUrl = process.env.REACT_APP_API_URL;

async function facebookLogin(code) {
  const facebookLoginResponse = await fetch(
    `${apiBaseUrl}/security/facebook/${code}`
  );
  if (facebookLoginResponse.status === 200) {
    return await facebookLoginResponse.json();
  } else {
    throw new Error(facebookLoginResponse.text());
  }
}

async function fetchMovies() {
  const fetchMoviesResponse = await fetch(`${apiBaseUrl}/movies`, {
    headers: createAuthHeaders()
  });
  const jsonResponse = await fetchMoviesResponse.json();
  return jsonResponse;
}

async function fetchMovie(id) {
  const fetchMovieResponse = await fetch(`${apiBaseUrl}/movies/${id}`, {
    headers: createAuthHeaders()
  });
  const jsonResponse = await fetchMovieResponse.json();
  return jsonResponse;
}

async function createMovie(movie) {
  const formData = new FormData();

  for (let key in movie) {
    formData.append(
      key,
      key === "formats" ? JSON.stringify(movie[key]) : movie[key]
    );
  }

  const createMovieResponse = await fetch(`${apiBaseUrl}/movies`, {
    headers: createAuthHeaders(),
    method: "POST",
    body: formData
  });

  return await createMovieResponse.json();
}

async function updateMovie(id, payload) {
  const formData = new FormData();

  for (let key in payload) {
    formData.append(
      key,
      key === "formats" ? JSON.stringify(payload[key]) : payload[key]
    );
  }

  const updateMovieResponse = await fetch(`${apiBaseUrl}/movies/${id}`, {
    headers: createAuthHeaders(),
    method: "PATCH",
    body: formData
  });
  return await updateMovieResponse.json();
}

async function deleteMovie(id) {
  const deleteMovieResponse = await fetch(`${apiBaseUrl}/movies/${id}`, {
    headers: createAuthHeaders(),
    method: "DELETE"
  });

  return await deleteMovieResponse.text();
}

async function fetchFormats() {
  const fetchFormatsResponse = await fetch(`${apiBaseUrl}/formats`, {
    headers: createAuthHeaders()
  });
  const jsonResponse = await fetchFormatsResponse.json();
  return jsonResponse;
}

async function bulkImport(file) {
  const formData = new FormData();
  formData.append("csv", file);

  const bulkImportReponse = await fetch(`${apiBaseUrl}/movies/import`, {
    headers: createAuthHeaders(),
    method: "POST",
    body: formData
  });

  return await bulkImportReponse.json();
}

function createAuthHeaders() {
  return new Headers({
    Authorization: `Bearer ${Cookies.get("jwt")}`
  });
}

export default {
  facebookLogin,
  fetchMovies,
  fetchMovie,
  createMovie,
  updateMovie,
  fetchFormats,
  deleteMovie,
  bulkImport
};
