import React, { Component } from "react";
import axios from "axios";

import classes from "./User.css";

class User extends Component {
  state = {
    toDolists: [],
    currentList: "",
    counter: 0,
    todoMsg: ''
  };

  componentDidMount() {
    this.loadDetails();
  }

  componentDidUpdate() {
    if (this.state.counter === 1) {
      this.loadDetails();
      this.setState({counter: 0});
    }
  }

  loadDetails = () => {
    // console.log('loaded');
    return axios
      .get("/user/" + this.props.activeUser._id)
      .then((response) => {
        // console.log(response.data.userDetails.toDoList);
        this.setState({toDolists: response.data.userDetails.toDoList})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  inputHandler = (event) => {
    // console.log(event.target.value);
    this.setState({ currentList: event.target.value });
  };

  keyHandler = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      this.addListHandler();
    }
  };

  addListHandler = (event) => {
    // console.log(this.props.activeUser._id);
    axios
      .post("/user/" + this.props.activeUser._id, {
        data: this.state.currentList,
      })
      .then((response) => {
        // console.log(response);
        this.setState({ counter: 1, currentList: " " });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.toDolists);
    let arr = this.state.toDolists.reverse();
    let allLists = arr.map((el) => {
      // console.log(el);
      return (
        <li key={Math.random()}>
          <input type="checkbox" style={{ marginRight: "1.5%" }} />
          <div className={classes.task}>{el}</div>
          {/* <div className={classes.update}>
            <div className={classes.pencil}>
              <i className="fa fa-pencil" id="edit" aria-hidden="true"></i>
            </div>
            <div className={classes.cross}>
              <i className="fa fa-times close" aria-hidden="true"></i>
            </div>
          </div> */}
        </li>
      );
    });

    return (
      <React.Fragment>
        <div className={classes.todo}>
          <div className={classes.head}>
            <h4>
              <i
                className="fa fa-pencil-square-o"
                style={{ fontSize: "21px" }}
                aria-hidden="true"
              ></i>
              Awesome To-do List
            </h4>
          </div>
          <input
            type="text"
            className={classes.inputListItem}
            placeholder="What would you like to do today"
            onChange={this.inputHandler}
            onKeyPress={this.keyHandler}
          />
          <button
            type="submit"
            className={classes.addButton}
            onClick={this.addListHandler}
          >
            Add
          </button>
          <div className={classes.listItems}>
            <ul>{allLists}</ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }
}

export default User;
