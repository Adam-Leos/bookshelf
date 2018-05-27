import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './sidenav/sidenav';

const barsStyles = {
  color: '#fff',
  padding: '10px',
  cursor: 'pointer',
};

export default class Header extends Component {
  state = {
    showNav: false,
  };

  onHideNav = () => {
    this.setState({ showNav: false });
  };

  onBarsClick = () => {
    this.setState({ showNav: true });
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            style={barsStyles}
            onClick={this.onBarsClick}
          />
        </div>
        <Nav showNav={this.state.showNav} onHideNav={this.onHideNav} />
        <Link to="/" className="logo">
          The Books Shelf
        </Link>
      </header>
    );
  }
}
