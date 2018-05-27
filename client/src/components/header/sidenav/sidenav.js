import React from 'react';
import SideNav from 'react-simple-sidenav';

const navStyles = {
  background: '#242424',
  maxWidth: '220px',
};

const Nav = ({ showNav, onHideNav }) => {
  return (
    <SideNav showNav={showNav} navStyle={navStyles} onHideNav={onHideNav}>
      Items
    </SideNav>
  );
};

export default Nav;
