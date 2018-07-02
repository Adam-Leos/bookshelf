import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = ({ user }) => {
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Profile',
      link: '/user',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Admins',
      link: '/user/register',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Login',
      link: '/login',
      restricted: false,
      exclude: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Reviews',
      link: '/user/user-reviews',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Review',
      link: '/user/add',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Logout',
      link: '/user/logout',
      restricted: true,
    },
  ];

  const createSideNavItem = ({ type, link, icon, text }, index) => (
    <div key={index} className={type}>
      <Link to={link}>
        <FontAwesome name={icon} />
        {text}
      </Link>
    </div>
  );

  const renderSideNavItems = () => {
    const login = user.login;
    const sideNavItems =
      login &&
      items.map((item, index) => {
        const isToRenderElement =
          (login.isAuth && !item.exclude) || !item.restricted;

        return isToRenderElement ? createSideNavItem(item, index) : null;
      });

    return sideNavItems;
  };

  return <div>{renderSideNavItems()}</div>;
};

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps)(SideNavItems);
