import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {
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
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Admins',
      link: '/user/register',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Login',
      link: '/login',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Reviews',
      link: '/user/user-reviews',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Review',
      link: '/user/add',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Logout',
      link: '/user/logout',
      restricted: false,
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
    const sideNavItems = items.map((item, index) => {
      return createSideNavItem(item, index);
    });

    return sideNavItems;
  };

  return <div>{renderSideNavItems()}</div>;
};

export default SideNavItems;
