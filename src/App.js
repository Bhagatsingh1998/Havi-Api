import React, { Component } from "react";

import Toolbar from "./containers/Toolbar/Toolbar";
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    userLogged: false,
    adminLogged: false,
    activeUser: false
  };

  logoutHandler = () => {
    this.setState({activeUser: false});
  }

  userLoggedHandler = (data) => {
    // this.setState.userLogged = data;
    // this.setState.adminLogged = false;
    // this.setState.activeUser = data;
    this.setState({
      userLogged: data,
      adminLogged: false,
      activeUser: data
    })
    console.log(this.state.activeUser);
  };

  adminLoggedHandler = (data) => {
    console.log(data);
    // this.setState.adminLogged = data;
    // this.setState.userLogged = false;
    // this.setState.activeUser = data;
    this.setState({
      userLogged: false,
      adminLogged: data,
      activeUser: data
    });
    console.log(this.state);
  };

  render() {
    // console.log(this.state);
    // let comp;

    // if(this.state.adminLogged) {
    //   activeUser = this.state.adminLogged;
    //   console.log('if');
    // } else {
    //   activeUser = this.state.userLogged;
    //   console.log('else');
    // }

    return (
      <React.Fragment>
        <Toolbar
          userLogged={(data) => this.userLoggedHandler(data)}
          adminLogged={(data) => this.adminLoggedHandler(data)}
          activeUser={this.state.activeUser}
          logout={this.logoutHandler}
        />
        
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
