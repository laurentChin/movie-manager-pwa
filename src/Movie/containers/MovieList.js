import { connect } from "react-redux";
import MovieList from "../components/List";
import { paginate } from "../Actions";

const mapStateToProps = ({ movies: { items: movies, offset, limit } }) => ({
  movies,
  offset,
  limit
});

const mapDispatchToProps = {
  paginate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
