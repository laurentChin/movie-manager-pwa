import { connect } from "react-redux";

import Movie from "../components/Item";
import { deleteMovie, fetchMovies, editMovie } from "../Actions";

const mapDispatchToProps = {
  deleteMovie,
  fetchMovies,
  editMovie
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
