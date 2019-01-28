import { connect } from "react-redux";
import { StartForm } from "../components";
import { startSignIn } from "../redux/actions";
import { startSelector } from "../redux/selectors";

import { validatePasswordConfirmation } from "../../core/validators";

const mapStateToProps = state => {
  return {
    validatePasswordConfirmation,
    submitHandler: startSignIn => values => {
      const { email, password } = values;
      startSignIn(email, password);
    },
    startSuccess: startSelector(state)
  };
};

const mapDispatchToProps = {
  startSignIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartForm);
