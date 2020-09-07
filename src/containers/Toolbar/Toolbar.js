import React, { Component } from "react";

import Navbar from "./../../components/Navbar/Navbar";
import Signup from "./../Signup/Signup";
import Login from "../Login/Login";

class Toolbar extends Component {
  state = {
    signupBtn: false,
    signinBtn: false
  };

  signupBtnHandler = () => {
    this.setState({ signupBtn: !this.state.signupBtn });
  };
  signinBtnHandler = () => {
    this.setState({ signinBtn: !this.state.signinBtn });
  };


  render() {
    return (
      <React.Fragment>
        <Navbar
          signupToggle={this.signupBtnHandler}
          signinToggle={this.signinBtnHandler}
          activeUser={this.props.activeUser}
          logout={this.props.logout}
        />
        <Signup
          show={this.state.signupBtn}
          signupToggle={this.signupBtnHandler}
          signinToggle={this.signinBtnHandler}
        />
        <Login
          show={this.state.signinBtn}
          signinToggle={this.signinBtnHandler}
          userLog={(data) =>  this.props.userLogged(data)}
          adminLog={(data) => this.props.adminLogged(data)}
        />
      </React.Fragment>
    );
  }
}

export default Toolbar;
