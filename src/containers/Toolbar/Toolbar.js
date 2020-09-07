import React, { Component } from 'react';

import Navbar from './../../components/Navbar/Navbar';
import Signup from './../Signup/Signup';
import Login from '../Login/Login';

class Toolbar extends Component {
  state={
    signup: false,
    signin: false
  }

  

  render() {
    return(
      <React.Fragment>
        <Navbar  />
        <Signup  />
        <Login   />
      </React.Fragment>
    );
  }
}

export default Toolbar;