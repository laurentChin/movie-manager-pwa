import { connect } from "react-redux";

import Movie from "../components/Item";
import { remove, fetch } from "../Actions";

const mapDispatchToProps = {
  remove,
  fetch,
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
