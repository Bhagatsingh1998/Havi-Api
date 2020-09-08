import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

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
    // console.log(this.state.activeUser);
  };

  adminLoggedHandler = (data) => {
    // console.log(data);
    // this.setState.adminLogged = data;
    // this.setState.userLogged = false;
    // this.setState.activeUser = data;
    this.setState({
      userLogged: false,
      adminLogged: data,
      activeUser: data
    });
    // console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          userLogged={(data) => this.userLoggedHandler(data)}
          adminLogged={(data) => this.adminLoggedHandler(data)}
          activeUser={this.state.activeUser}
          logout={this.logoutHandler}
        />
        {this.state.activeUser ? null : <Redirect to="/" ></Redirect>}
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

// Admin:
// {
//   loggedIn: [
//     2020-09-08T07:35:59.132Z,
//     2020-09-08T07:37:59.336Z,
//     2020-09-08T07:38:40.824Z,
//     2020-09-08T10:10:35.164Z,
//     2020-09-08T10:16:47.870Z,
//     2020-09-08T10:17:56.113Z
//   ],
//   toDoList: [],
//   _id: 5f571b2edea9f800045e5ef0,
//   id: '15',
//   name: 'admin 1',
//   email: 'admin1@admin.com',
//   userName: 'admin1',
//   phone: '9874563210',
//   dob: '2020-09-01',
//   password: '$2a$12$auoHyEBj22IhAj9tBdvCp.71snoZ9CUYVNkbo7WMEH0cC4gYB0Cr2',
//   gender: 'Male',
//   avtarNumber: 'av1',
//   userType: 'Admin',
//   signupTime: 'Tue Sep 08 2020 05:48:30 GMT+0000 (Coordinated Universal Time)',
//   __v: 6
// }
