import { connect } from "react-redux";
import { LogInForm } from "../components";
import { logIn } from "../Actions";

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
  submitHandler: logIn => values => {
    const { email, password } = values;
    logIn(email, password);
  },
});

const mapDispatchToProps = {
  logIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);
