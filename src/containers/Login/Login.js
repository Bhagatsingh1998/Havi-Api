import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import classes from './Login.css';

class Login extends Component {
  state={
    email: null,
    password: null,
    login: false,
    logincounter: 0
  };

  componentDidUpdate() {
    if(this.state.login && this.state.logincounter == 0) {
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      console.log(data);
      axios.post('https://person-api-app.herokuapp.com/user/login',data)
      .then(response => {
        console.log(response.data);
        this.setState({logincounter: 1})
        this.props.signinToggle();
        if(response.data.userDetails.userType === 'User') {
          this.props.userLog(response.data.userDetails);
        } else {
          console.log(response.data.userDetails);
          this.props.adminLog(response.data.userDetails);
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      return;
    }
  }

  loginHandler = event => {
    event.preventDefault();
    this.setState({login: true});
  }

  emailHandler = event => {
    this.setState({email: event.target.value});
  }

  passwordHandler = event => {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.signinToggle}>
          <Modal.Header closeButton>
            <Modal.Title>LogIn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="login-form" onSubmit={this.loginHandler} className={classes.loginForm}>
              <div  className={classes.label}>
                <input type="text" onChange={this.emailHandler} required placeholder="Email" />
              </div>
              <div className={classes.label}>
                <input type="password" onChange={this.passwordHandler} required placeholder="Password" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.signinToggle}>
              Close
            </Button>
            <Button variant="success" form="login-form" type="submit">
              LogIn 
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Login;