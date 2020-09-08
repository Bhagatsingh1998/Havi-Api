import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

import classes from './UserDetails.css';
import av1 from "./../../../assets/images/avtars/av1.png"
import av2 from "./../../../assets/images/avtars/av2.png";
import av3 from "./../../../assets/images/avtars/av3.png";
import av4 from "./../../../assets/images/avtars/av4.png";

class UserDetails extends Component {

  render() {
    // console.log(this.props);
    let avtar;
    if (
      this.props.currentUser.avtarNumber === "boy") {
      avtar = av1;
    } else if (this.props.currentUser.avtarNumber === "gentleman") {
      avtar = av2;
    } else if (this.props.currentUser.avtarNumber === "girl") {
      avtar = av3;
    } else if (this.props.currentUser.avtarNumber === "gentlewomen") {
      avtar = av4;
    }

    let loggedInHistory = <li>User never loggedIn</li>
    if(this.props.currentUser.loggedIn) {
      // console.log(this.props.currentUser.loggedIn.length);
      if(this.props.currentUser.loggedIn.length > 0) {
        loggedInHistory = this.props.currentUser.loggedIn.map(history => {
          return(<li key={Math.random()}>{history}</li>);
        });
      }
    }

    let toDo = <li>No TODO created</li>;
    if(this.props.currentUser.toDoList) {
      // console.log(this.props.currentUser.loggedIn.length);
      if(this.props.currentUser.toDoList.length > 0) {
        toDo = this.props.currentUser.toDoList.map(todo => {
          // console.log('aaaa');
          return(<li key={Math.random()}>{todo}</li>);
        });
      }
    } 
    // console.log(toDo);
    
    // let currentAge = new Date().getFullYear() - this.props.currentUser.dob; 
    let modalBody = (
      <React.Fragment>
        <div className={classes.mainInfo}>
          <div className={classes.holder}>
            <img src={avtar} alt="" />
          </div>
          <div className={classes.name}>
            <h3>{this.props.currentUser.name}</h3>
            <h5>@{this.props.currentUser.userName}</h5>
          </div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>Email</div>
          <div className={classes.labelInfo}>{this.props.currentUser.email}</div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>Phone Number</div>
          <div className={classes.labelInfo}>+91 {this.props.currentUser.phone}</div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>Date of Birth</div>
          <div className={classes.labelInfo}>{this.props.currentUser.dob}</div>
        </div>
        {/* <div className={classes.otherInfo}>
          <div className={classes.label}>Age</div>
          <div className={classes.labelInfo}>{currentAge}</div>
        </div> */}
        <div className={classes.otherInfo}>
          <div className={classes.label}>Gender</div>
          <div className={classes.labelInfo}>{this.props.currentUser.gender}</div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>Registered On</div>
          <div className={classes.labelInfo}>{this.props.currentUser.signupTime}</div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>LoggedIn <br /> History</div>
          <div className={classes.labelInfo}>
            <ul>
              {loggedInHistory}
            </ul>
          </div>
        </div>
        <div className={classes.otherInfo}>
          <div className={classes.label}>To Do List</div>
          <div className={classes.labelInfo}>
            <ul>
              {toDo}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );

    return(
      <React.Fragment>
        <Modal show={this.props.show} onHide={() => this.props.showDetailsHandler(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalBody}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.props.showDetailsHandler(false)}>
              Close
            </Button>
            {/* <Button variant="success" onClick={() => this.props.showDetailsHandler(false)}>
              Edit
            </Button> */}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
  
}

export default UserDetails;