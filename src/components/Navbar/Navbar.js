import React from 'react';
import { Navbar } from 'react-bootstrap';

import haviLogo from './../../assets/havi_full_logo.jpg';
import './Navbar.css';

const   Header = props => {
  return (
    <>
      <Navbar className="Navbar" bg="light">
        <Navbar.Brand href="#home">
          <div className="LogoHolder">
            <img src={haviLogo} alt="logo" />
          </div>
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Header;