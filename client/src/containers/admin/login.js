import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {
  state = {
    email: '',
    passwords: '',
    error: '',
    success: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) this.props.history.push('/user');
  }

  formSubmitHandler = event => {
    event.preventDefault();

    this.props.dispatch(loginUser(this.state));
  };

  emailChangeHandler = event => {
    this.setState({ email: event.target.value });
  };

  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { user } = this.props;

    return (
      <div className="rl_container">
        <form action="/api/login" onSubmit={this.formSubmitHandler}>
          <h2>Login here</h2>
          <div className="form_element">
            <input
              type="email"
              onChange={this.emailChangeHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              onChange={this.passwordChangeHandler}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Login</button>

          <div className="error">
            {user.login ? <div>{user.login.message}</div> : null}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps)(Login);
