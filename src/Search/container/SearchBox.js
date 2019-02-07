import { connect } from "react-redux";

import { search, reset } from "../actions";

import SearchBox from "../components/SearchBox";

const mapStateToProps = ({ search: { terms, matches } }) => ({
  terms,
  matches
});

const mapDispatchToProps = {
  search,
  reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
