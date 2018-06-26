import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import { getUserReviews } from '../../actions';

class UserReviews extends Component {
  componentDidUpdate() {
    const { user, dispatch } = this.props;

    if (user.login && !user.userReviews)
      dispatch(getUserReviews(user.login.id));
  }

  showUserPosts = user => {
    return (
      user.userReviews &&
      user.userReviews.map(({ _id, name, author, createdAt }) => (
        <tr key={_id}>
          <td>
            <Link to={`/user/edit-posts/${_id}`}>{name}</Link>
          </td>
          <td>{author}</td>
          <td>{moment(createdAt).format('MM/DD/YY')}</td>
        </tr>
      ))
    );
  };

  render() {
    const { user } = this.props;

    return (
      <div className="user_posts">
        <h4>Your reviews:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.showUserPosts(user)}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps)(UserReviews);
