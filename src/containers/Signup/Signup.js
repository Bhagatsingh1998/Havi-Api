import React, { Component } from 'react';
import axios from 'axios';

import classes from './Signup.css';
import av1 from './../../assets/images/avtars/av1.png';
import av2 from './../../assets/images/avtars/av2.png';
import av3 from './../../assets/images/avtars/av3.png';
import av4 from './../../assets/images/avtars/av4.png';

class Signup extends Component {
  state={
    name: null,
    email: null,
    userName: null,
    phone: null,
    dob: null,
    password: null,
    cpassword: null,
    gender: null,
    avtarNumber: null,
    signup: false,
    message: null,
    remove: false
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if(!this.state.signup) {
      return;
    } 
    else {
      let data = {
        name: this.state.name,
        email: this.state.email,
        userName: this.state.userName,
        phone: this.state.phone,
        dob: this.state.dob,
        password: this.state.password,
        cpassword: this.state.cpassword,
        gender: this.state.gender,
        avtarNumber: this.state.avtarNumber
      };
      console.log('data', data);

      axios.post('http://localhost:5000/user/signup', data)
      .then(response => {
        console.log('aa');
        console.log(response);
        this.setState({
          name: '',
          email: '',
          userName: '',
          phone: '',
          dob: '',
          password: '',
          cpassword: '',
          gender: 'Select an option',
          avtarNumber: '',
          signup: false,
          message: response.data,
          remove: true
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
    }
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
    if(this.state.remove) {
      this.setState({remove: false});
      console.log('remove true');
      return true;
    }
  }

  signupHandler = (event) => {
    event.preventDefault();
    if(this.state.gender) {
      this.setState({signup: true});
      console.log('signupHandler');
    }
  }

  nameHandler = event => {
    this.setState({
      name: event.target.value
    })
  }

  emailHandler = event => {
    this.setState({email: event.target.value});
  }

  usernameHandler = event => {
    this.setState({userName: event.target.value })
  }

  phoneHandler = event => {
    this.setState({phone : event.target.value })
  }
  
  passwordHandler = event => {
    this.setState({password: event.target.value })
  }

  cpasswordHandler = event => {
    this.setState({cpassword: event.target.value })
  }

  dobHandler = event => {
    this.setState({dob: event.target.value })
  }

  genderHandler = event => {
    this.setState({gender: event.target.value })
  }

  avatarHandler = event => {
    this.setState({avtarNumber: event.target.value })
  }

  render() {
    let signupComponent = <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >SignUp Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true" style={{color: 'red'}}>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={this.signupHandler} id="signup-form">
              <div  className={classes.label}>
                <input type="text" onChange={this.nameHandler} value={this.state.name} required placeholder="Your Full Name" />
              </div>
              <div  className={classes.label}>
                <input type="text" onChange={this.emailHandler}  value={this.state.email} required placeholder="Email" />
              </div>
              <div  className={classes.label}>
                <input type="text" onChange={this.usernameHandler} value={this.state.userName} required placeholder="UserName" />
              </div>
              <div  className={classes.label}>
                <input type="number" onChange={this.phoneHandler} value={this.state.phone} required placeholder="Phone Number" />
              </div>
              <div className={classes.label}>
                <input type="password" onChange={this.passwordHandler} value={this.state.password} required placeholder="Password" />
              </div>
              <div className={classes.label}>
                <input type="password" onChange={this.cpasswordHandler} value={this.state.cpassword} required placeholder="Confirm Password" />
              </div>
              <div  className={classes.label}>
                <input required onChange={this.dobHandler} value={this.state.dob} type="date" />
              </div>
              <div className={classes.label}>
                <select required onChange={this.genderHandler} value={this.state.gender}>
                  <option disabled selected value>Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className={classes.label}>
                <p>Select your avatar</p>
                <div className={classes.mainHolder}>
                  <div className={classes.avatar}>
                    <div className={classes.holder}>
                      <img src={av1} alt="" />
                    </div>
                    <input type="radio" required name="avatar" onChange={this.avatarHandler} value="1" />
                  </div>
                  <div className={classes.avatar}>
                    <div className={classes.holder}>
                      <img src={av2} alt="" />
                    </div>
                    <input type="radio" required  name="avatar" onChange={this.avatarHandler} value="2" />
                  </div>
                  <div className={classes.avatar}>
                    <div className={classes.holder}>
                      <img src={av3} alt="" />
                    </div>
                    <input type="radio"  required name="avatar" onChange={this.avatarHandler} value="3" />
                  </div>
                  <div className={classes.avatar}>
                    <div className={classes.holder}>
                      <img src={av4} alt="" />
                    </div>
                    <input type="radio"  required name="avatar" onChange={this.avatarHandler} value="4" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancle</button>
            <button type="submit" form="signup-form" class="btn btn-success">SignUp</button>
          </div>
        </div>
      </div>
    </div>;

    // let script = <script>document.getElementById('radio').checked = false; document.getElementById('select').selectedIndex = 0</script>;

    return (
      <React.Fragment>
        {signupComponent}
        {/* {script} */}
      </React.Fragment>
    );
  }
}

export default Signup;