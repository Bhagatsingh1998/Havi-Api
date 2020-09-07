import React, { Component } from 'react';
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
    if(!this.state.login ) {
      return;
    } else {
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      console.log(data);
      axios.post('http://localhost:5000/user/login',data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  loginHandler = event => {
    event.preventDefault();
    this.setState({login: true, logincounter: 1});
  }

  emailHandler = event => {
    this.setState({email: event.target.value});
  }

  passwordHandler = event => {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true" style={{color: 'red'}}>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="login-form" onSubmit={this.loginHandler} className={classes.loginForm}>
                <div  className={classes.label}>
                  <input type="text" onChange={this.emailHandler} required placeholder="Email" />
                </div>
                <div className={classes.label}>
                  <input type="password" onChange={this.passwordHandler} required placeholder="Password" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cancle</button>
              <button type="submit" form="login-form" class="btn btn-success">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;