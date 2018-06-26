import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sidenavItems';

const navStyles = {
  background: '#242424',
  maxWidth: '220px',
};

const Nav = ({ showNav, onHideNav }) => {
  return (
    <SideNav showNav={showNav} navStyle={navStyles} onHideNav={onHideNav}>
      <SideNavItems />
    </SideNav>
  );
};

export default Nav;
