import React from 'react';

const User = props => {
  const login = props.user.login || {};
  const { name, lastname, email } = login;

  return (
    <div className="user_container">
      <div className="avatar">
        <img alt="avatar" src="/images/avatar.png" />
      </div>
      <div className="nfo">
        <div>
          <span>Name: </span> {name}
        </div>
        <div>
          <span>Lastname: </span> {lastname}
        </div>
        <div>
          <span>Email: </span> {email}
        </div>
      </div>
    </div>
  );
};

export default User;
