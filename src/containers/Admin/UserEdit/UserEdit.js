import React, { PureComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

import classes from "./UserEdit.css";
import av1 from "./../../../assets/images/avtars/av1.png";
import av2 from "./../../../assets/images/avtars/av2.png";
import av3 from "./../../../assets/images/avtars/av3.png";
import av4 from "./../../../assets/images/avtars/av4.png";


class UserEdit extends PureComponent {
  state = {
    name: '',
    userName: '',
    phone: '',
    dob: '',
    gender: '',
    edit: false,
    counter: 0,
    initial: 0
  };

  componentDidMount() {
    console.log(this.props.currentUser);
    console.log(this.state);
  }

  componentDidUpdate() {
    // console.log(this.state.counter);
    if(this.props.show && this.state.counter === 0) {
      this.setState({
        name: this.props.currentUser.name,
        userName: this.props.currentUser.userName,
        phone: this.props.currentUser.phone,
        dob: this.props.currentUser.dob,
        gender: this.props.currentUser.gender,
        counter: 1,
      });
    }

    if(this.state.initial) {
      this.setState({initial: 0});
      console.log(this.state);
      return true;
    }
    // console.log(this.state);
    // console.log(this.props.currentUser);

    if(this.state.edit) {
      console.log('aa');
      let data = {
        name: this.state.name,
        userName: this.state.userName,
        phone: this.state.phone,
        dob: this.state.dob,
        gender: this.state.gender
      };

      axios.patch('http://localhost:5000/user/'+ this.props.currentUser._id, data)
      .then(response => {
        console.log(response);
        this.setState({edit: false});
        this.props.showEditsHandler(false);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  updateHandler = () => {
    console.log('update');
    this.setState({edit: true});
  }

  nameEditHandler = (event) => {
    console.log(this.state);
    this.setState({ name: event.target.value, initial: 1});
  };

  userNameEditHandler = (event) => {
    this.setState({ userName: event.target.value, initial: 1 });
  };

  phoneEditHandler = (event) => {
    this.setState({ phone: event.target.value, initial: 1 });
  };

  dobEditHandler = (event) => {
    this.setState({ dob: event.target.value, initial: 1 });
  };

  genderEditHandler = (event) => {
    console.log('a');
    this.setState({ gender: event.target.value, initial: 1 });
  };

  render() {
    let avtar;
    if (this.props.currentUser.avtarNumber === "av1") {
      avtar = av1;
    } else if (this.props.currentUser.avtarNumber === "av2") {
      avtar = av2;
    } else if (this.props.currentUser.avtarNumber === "av3") {
      avtar = av3;
    } else if (this.props.currentUser.avtarNumber === "av4") {
      avtar = av4;
    }

    let loggedInHistory = <li>User never loggedIn</li>;
    if (this.props.currentUser.loggedIn) {
      // console.log(this.props.currentUser.loggedIn.length);
      if (this.props.currentUser.loggedIn.length > 0) {
        loggedInHistory = this.props.currentUser.loggedIn.map((history) => {
          return <li key={Math.random()}>{history}</li>;
        });
      }
    }

    let toDo = <li>No TODO created</li>;
    if (this.props.currentUser.toDoList) {
      // console.log(this.props.currentUser.loggedIn.length);
      if (this.props.currentUser.toDoList.length > 0) {
        toDo = this.props.currentUser.toDoList.map((todo) => {
          return <li key={Math.random()}>{todo}</li>;
        });
      }
    }
    // console.log(toDo);

    let editModal = (
      <React.Fragment>
        <form id="edit-form">
          <div className={classes.mainInfo}>
            <div className={classes.holder}>
              <img src={avtar} alt="" />
            </div>
            <div className="name">
              <h3>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.nameEditHandler}
                />
              </h3>
              <h5>
                @
                <input
                  type="text"
                  value={this.state.userName}
                  onChange={this.userNameEditHandler}
                />
              </h5>
            </div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>Email</div>
            <div className={classes.labelInfo}>test@test.com</div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>Phone Number</div>
            <div className={classes.labelInfo}>
              <input
                type="number"
                value={this.state.phone}
                onChange={this.phoneEditHandler}
              />
            </div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>Date of Birth</div>
            <div className={classes.labelInfo}>
              <input
                type="date"
                value={this.state.dob}
                onChange={this.dobEditHandler}
              />
            </div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>Gender</div>
            <div className={classes.labelInfo}>
              <select onChange={this.genderEditHandler} required>
                <option value>Select an option</option>
                <option  value="Male">
                  Male
                </option>
                <option  value="Female">
                  Female
                </option>
              </select>
            </div>
          </div>
          {/* <div className={classes.otherInfo}>
            <div className={classes.label}>Age</div>
            <div className={classes.labelInfo}>23years</div>
          </div> */}
          <div className={classes.otherInfo}>
            <div className={classes.label}>Registered On</div>
            <div className={classes.labelInfo}>23-8-202</div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>LoggedIn History</div>
            <div className={classes.labelInfo}>
              <ol>{loggedInHistory}</ol>
            </div>
          </div>
          <div className={classes.otherInfo}>
            <div className={classes.label}>To Do List</div>
            <div className={classes.labelInfo}>
              <ul>{toDo}</ul>
            </div>
          </div>
        </form>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          onHide={() => this.props.showEditsHandler(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{editModal}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.showEditsHandler(false)}
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={this.updateHandler}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserEdit;