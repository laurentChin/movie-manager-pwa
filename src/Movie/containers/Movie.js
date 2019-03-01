import { connect } from "react-redux";

import Movie from "../components/Item";
import { remove, fetch, edit } from "../Actions";

const mapDispatchToProps = {
  remove,
  fetch,
  edit
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
