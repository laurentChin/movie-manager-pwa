import React from "react";
import { connect } from "react-redux";
import { FinishForm } from "../components";
import { finishSignIn } from "../redux/actions";
import { finishSelector } from "../redux/selectors";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../Auth/constants";

const mapStateToProps = state => {
  const execResult = /^\?token=([a-z0-9]+)?/.exec(window.location.search);
  return {
    submitHandler: finishSignIn => values => {
      const { token } = values;
      finishSignIn(token);
    },
    finishSuccess: finishSelector(state),
    initialValues: {
      token: execResult ? execResult[1] : null
    },
    loginLink: <Link to={LOGIN_PAGE}>Log In</Link>
  };
};

const mapDispatchToProps = {
  finishSignIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishForm);
