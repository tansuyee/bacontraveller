import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions';

class AuthContainer extends React.Component {
  
  componentDidMount() {
    if (!this.props.auth.isLoggedIn && localStorage.getItem('access_token')) {
      this.props.configAndInitialize();
    }
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(AuthContainer)
