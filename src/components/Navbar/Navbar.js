import React from 'react';
import { Navbar } from 'react-bootstrap';

import haviLogo from './../../assets/haviLogo.png';
import './Navbar.css';

const   Header = props => {
  return (
    <>
      <Navbar className="Navbar" bg="light">
        <Navbar.Brand href="#home">
            <img src={haviLogo} alt="logo" />
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Header;