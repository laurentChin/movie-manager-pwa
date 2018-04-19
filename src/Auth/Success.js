import React, { Component } from 'react';
import {connect} from 'react-redux';
import {facebookLogin} from './Actions';

class Success extends Component {
  componentDidMount() {
    const accessToken = this.props.location.search.replace('?code=', '');
    if(!this.props.isAuthenticated && !this.props.isFetching) {
      this.props.dispatch(facebookLogin(accessToken));
    }
  }

  render() {
    return (
      <div>
        Processing authentication...
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {isFetching, isAuthenticated} = state.auth;
  return {
    isFetching,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Success);
