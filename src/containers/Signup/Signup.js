import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios';

import classes from './Signup.css';
import av1 from './../../assets/images/avtars/av1.png';
import av2 from './../../assets/images/avtars/av2.png';
import av3 from './../../assets/images/avtars/av3.png';
import av4 from './../../assets/images/avtars/av4.png';

class Signup extends Component {
  state={
    name: '',
    email: '',
    userName: '',
    phone: '',
    dob: '',
    password: '',
    cpassword: '',
    gender: 'Male',
    isAdmin: '',
    avtarNumber: '',
    signup: false,
    message: '',
    remove: false,
    signupErr: null
  }

  // shouldComponentUpdate(prevProps, prevSate) {
  //   if(this.state.signup !== prevSate.signup ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
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
        isAdmin: this.state.isAdmin,
        avtarNumber: this.state.avtarNumber
      };
      // console.log('data', data);

      axios.post('/user/signup', data)
      .then(response => {
        // console.log(response);
        this.setState({
          name: '',
          email: '',
          userName: '',
          phone: '',
          dob: '',
          password: '',
          cpassword: '',
          gender: 'Male',
          isAdmin: '',
          avtarNumber: '',
          signup: false,
          message: response.data,
        });
        // console.log(this.state);
        this.props.signupToggle();
        this.props.signinToggle();
      })
      .catch(error => {
        // console.log(error);
        this.setState({signupErr: error.response.data.message})
      });
    }
  }

  // componentWillUnmount(){
  //   console.log('componentWillUnmount');
  // }

  signupHandler = (event) => {
    // console.log('aa');
    event.preventDefault();
    if(this.state.gender) {
      this.setState({signup: true});
      // console.log('signupHandler');
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

  isAdminHandler = (event) => {
    this.setState({isAdmin: event.target.value })
  }

  avatarHandler = event => {
    this.setState({avtarNumber: event.target.value })
  }

  render() {
    let errorComp = null;
    if(this.state.signupErr) {
      errorComp = <p style={{color: 'red', textAlign: 'center'}}>{this.state.signupErr}</p>
    }

    let signupComponent =
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
        <div className={classes.subLabel}>
          <span><strong>Date of Birth</strong> </span>
          <input required onChange={this.dobHandler} value={this.state.dob} type="date" placeholder="DOB" />  
        </div>
      </div>
      <div  className={classes.label}>
        <div className="subLabel">
          <div className={classes.subLabel}>
            <span><strong>User Type</strong> </span>
            <input type="radio" onChange={this.isAdminHandler} required name="userType" value="0" />Admin
            <input type="radio" onChange={this.isAdminHandler} required name="userType" value="1" />User
          </div>
        </div>
      </div>
      <div className={classes.label}>
        <select required onChange={this.genderHandler} value={this.state.gender}>
          <option disabled  >Select an option</option>
          <option selected value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className={classes.label}>
        <p><strong>Select your avatar</strong> </p>
        <div className={classes.mainHolder}>
          <div className={classes.avatar}>
            <div className={classes.holder}>
              <img src={av1} alt="" />
            </div>
            <input type="radio" required name="avatar" onChange={this.avatarHandler} value="boy" />
          </div>
          <div className={classes.avatar}>
            <div className={classes.holder}>
              <img src={av2} alt="" />
            </div>
            <input type="radio" required  name="avatar" onChange={this.avatarHandler} value="gentleman" />
          </div>
          <div className={classes.avatar}>
            <div className={classes.holder}>
              <img src={av3} alt="" />
            </div>
            <input type="radio"  required name="avatar" onChange={this.avatarHandler} value="girl" />
          </div>
          <div className={classes.avatar}>
            <div className={classes.holder}>
              <img src={av4} alt="" />
            </div>
            <input type="radio"  required name="avatar" onChange={this.avatarHandler} value="gentlewomen" />
          </div>
        </div>
      </div>
    </form>;

    return (
      <React.Fragment>
        <Modal show={this.props.show} onHide={this.props.signupToggle}>
          <Modal.Header closeButton >
            <Modal.Title>SignUp User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorComp}
            {signupComponent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.signupToggle}>
              Close
            </Button>
            <Button variant="success" form="signup-form" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Signup;