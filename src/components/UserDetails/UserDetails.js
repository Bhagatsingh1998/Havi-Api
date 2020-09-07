import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import classes from './UserDetails.css';
import av1 from "./../../assets/images/avtars/av1.png";
import av2 from "./../../assets/images/avtars/av2.png";
import av3 from "./../../assets/images/avtars/av3.png";
import av4 from "./../../assets/images/avtars/av4.png";

const UserDetails = props => {
  console.log(props);
  let avtar;
  if (props.currentUser.avtarNumber === "av1") {
    avtar = av1;
  } else if (props.currentUser.avtarNumber === "av2") {
    avtar = av2;
  } else if (props.currentUser.avtarNumber === "av3") {
    avtar = av3;
  } else if (props.currentUser.avtarNumber === "av4") {
    avtar = av4;
  }

  let loggedInHistory = <li>User never loggedIn</li>
  if(props.currentUser.loggedIn) {
    // console.log(props.currentUser.loggedIn.length);
    if(props.currentUser.loggedIn.length > 0) {
      loggedInHistory = props.currentUser.loggedIn.map(history => {
        return(<li key={Math.random()}>{history}</li>);
      });
    }
  }

  let toDo = <li>No TODO created</li>;
  if(props.currentUser.toDoList) {
    // console.log(props.currentUser.loggedIn.length);
    if(props.currentUser.toDoList.length > 0) {
      toDo = props.currentUser.toDoList.map(todo => {
        // console.log('aaaa');
        return(<li key={Math.random()}>{todo}</li>);
      });
    }
  } 
  // console.log(toDo);
  
  // let currentAge = new Date().getFullYear() - props.currentUser.dob; 
  let modalBody = (
    <React.Fragment>
      <div className={classes.mainInfo}>
        <div className={classes.holder}>
          <img src={avtar} alt="" />
        </div>
        <div className={classes.name}>
          <h3>{props.currentUser.name}</h3>
          <h5>@{props.currentUser.userName}</h5>
        </div>
      </div>
      <div className={classes.otherInfo}>
        <div className={classes.label}>Email</div>
        <div className={classes.labelInfo}>{props.currentUser.email}</div>
      </div>
      <div className={classes.otherInfo}>
        <div className={classes.label}>Phone Number</div>
        <div className={classes.labelInfo}>+91 {props.currentUser.phone}</div>
      </div>
      <div className={classes.otherInfo}>
        <div className={classes.label}>Date of Birth</div>
        <div className={classes.labelInfo}>{props.currentUser.dob}</div>
      </div>
      {/* <div className={classes.otherInfo}>
        <div className={classes.label}>Age</div>
        <div className={classes.labelInfo}>{currentAge}</div>
      </div> */}
      <div className={classes.otherInfo}>
        <div className={classes.label}>Gender</div>
        <div className={classes.labelInfo}>{props.currentUser.gender}</div>
      </div>
      <div className={classes.otherInfo}>
        <div className={classes.label}>Registered On</div>
        <div className={classes.labelInfo}>{props.currentUser.signupTime}</div>
      </div>
      <div className={classes.otherInfo}>
        <div className={classes.label}>LoggedIn History</div>
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
      <Modal show={props.show} onHide={() => props.showDetailsHandler(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.showDetailsHandler(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => props.showDetailsHandler(false)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UserDetails;