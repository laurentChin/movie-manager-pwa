import React, { Component } from 'react';

import './Login.css';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this._initiateFacebookLogin = this._initiateFacebookLogin.bind(this);
  }

  _initiateFacebookLogin() {
    window.location.href = process.env.REACT_APP_FB_LOGIN_URL;
  }

  render() {
    return (
      <div className="login-options-container">
        <div className="facebook-login-btn" onClick={() => this._initiateFacebookLogin()}>Log in with Facebook</div>
      </div>
    );
  }
}

export default LogIn;
