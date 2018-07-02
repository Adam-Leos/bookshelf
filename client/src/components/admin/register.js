import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, registerUser } from '../../actions';

class Register extends Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: null,
  };

  componentDidMount() {
    this.props.dispatch(getUsers());
  }

  componentWillReceiveProps(nextProps) {
    const stateData = nextProps.user.isRegistered
      ? { name: '', lastname: '', email: '', password: '' }
      : { error: 'Oops, Something went wrong.' };

    this.setState(stateData);
  }

  onInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    const newState = { ...this.state };

    newState[name] = value;

    this.setState({ ...newState });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { name, lastname, email, password } = this.state;

    this.props.dispatch(
      registerUser({ name, lastname, email, password }, this.props.user.users),
    );

    this.setState({ error: null });
  };

  renderUsers = users =>
    users &&
    users.map(({ name, lastname, email, _id }) => (
      <tr key={_id}>
        <td>{name}</td>
        <td>{lastname}</td>
        <td>{email}</td>
      </tr>
    ));

  render() {
    const { user } = this.props;
    const { users } = user;

    return (
      <div className="rl_container">
        <form onSubmit={this.onFormSubmit}>
          <h2>Add user</h2>

          <div className="form_element">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              name="lastname"
              placeholder="Enter lastname"
              onChange={this.onInputChange}
              value={this.state.lastname}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={this.onInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              onChange={this.onInputChange}
              value={this.state.password}
            />
          </div>

          <button type="submit">Add user</button>

          <div className="error">{this.state.error}</div>
        </form>

        {users && (
          <div className="current_users">
            <h4>Current users</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Lastname</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>{this.renderUsers(users)}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { user: state.userReducer };
}

export default connect(mapStateToProps)(Register);
