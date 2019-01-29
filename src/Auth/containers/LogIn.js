import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LogInForm } from "../components";
import { logIn } from "../Actions";
import { HOME_PAGE } from "../../constants";
import { SIGN_IN_PAGE } from "../../SignIn/constants";

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
  submitHandler: logIn => values => {
    const { email, password } = values;
    logIn(email, password);
  },
  redirect: <Redirect to={HOME_PAGE} />,
  signInLink: <Link to={SIGN_IN_PAGE}>Create an account</Link>
});

const mapDispatchToProps = {
  logIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);
