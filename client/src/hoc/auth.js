import React, { Component } from 'react';
import { auth } from '../actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      isLoading: false,
    };

    componentDidMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ isLoading: false });

      if (!nextProps.user.login.isAuth) {
        if (reload) {
          this.props.history.push('/login');
        }
      } else {
        if (reload === false) {
          this.props.history.push('/user');
        }
      }
    }

    render() {
      if (this.state.isLoading) {
        return <div className="loader">Loading...</div>;
      }

      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return { user: state.userReducer };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
