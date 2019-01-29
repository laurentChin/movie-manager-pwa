import React from "react";
import { connect } from "react-redux";
import { StartForm } from "../components";
import { startSignIn } from "../redux/actions";
import { startSelector } from "../redux/selectors";

import { validatePasswordConfirmation } from "../../core/validators";
import { LOGIN_PAGE } from "../../Auth/constants";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    validatePasswordConfirmation,
    submitHandler: startSignIn => values => {
      const { email, password } = values;
      startSignIn(email, password);
    },
    startSuccess: startSelector(state),
    logInLink: <Link to={LOGIN_PAGE}>Log In</Link>
  };
};

const mapDispatchToProps = {
  startSignIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartForm);
