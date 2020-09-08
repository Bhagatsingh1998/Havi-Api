import React, { Component } from "react";
import axios from "axios";

import UserDetails from "./UserDetails/UserDetails";
import UserEdits from "./UserEdit/UserEdit";
import classes from "./Admin.css";
import av1 from "./../../assets/images/avtars/av1.png";
import av2 from "./../../assets/images/avtars/av2.png";
import av3 from "./../../assets/images/avtars/av3.png";
import av4 from "./../../assets/images/avtars/av4.png";

class Admin extends Component {
  state = {
    showDetails: false,
    showEdits: false,
    allUsers: [],
    currentUser: false,
    delete: false,
    counter: 0
  };

  componentDidMount() {
    // console.log(this.props);
    this.loadUsers();
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   if(this.props !== prevProps) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  componentDidUpdate() {
    if(this.state.counter === 0) {
      // console.log(this.props);
      this.loadUsers();
      
    }
    
  }

  loadUsers = () => {
    axios
      .get("/user")
      .then((response) => {
        // console.log(response);
        this.setState({ allUsers: response.data.users, counter: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showDetailsHandler = (user) => {
    this.setState({ showDetails: !this.state.showDetails,  currentUser: user});
  };

  showEditsHandler = (user) => {
    this.setState({ showEdits: !this.state.showEdits, currentUser: user });
  };

  deleteHandler = (id) => {
    axios.delete('/user/'+ id)
    .then(response => {
      // console.log(response);
      this.loadUsers();
      // this.setState({delete: !this.state.delete});
    })
    .catch(error => {
      console.log(error);
    });
  };

  counterHandler = () => {
    this.setState({counter: 0});
  }

  render() {
    // let articelClasses = [classes.card, classes.userItem];

    let allArticles = this.state.allUsers.map((user) => {
      let avtar;
      if (user.avtarNumber === "boy") {
        avtar = av1;
      } else if (user.avtarNumber === "gentleman") {
        avtar = av2;
      } else if (user.avtarNumber === "girl") {
        avtar = av3;
      } else if (user.avtarNumber === "gentlewomen") {
        avtar = av4;
      }
      return (
        <article key={Math.random()} className={classes.card}>
          <header className={classes.card__header}>
            <h3 className={classes.user__title}>{user.userName}</h3>
          </header>
          <div className={classes.card__image}>
            <img src={avtar} alt="" />
          </div>
          <div className={classes.card__content}>
            <h4 className={classes.user__name}>{user.name}</h4>
            <p className={classes.user__description}>{user.userType}</p>
          </div>
          <div className={classes.card__actions}>
            <button
              type="button"
              className={classes.btn}
              onClick={() => this.showDetailsHandler(user)}
            >
              Details
            </button>
            <button
              type="button"
              className={classes.btn}
              onClick={() => this.showEditsHandler(user)}
            >
              Edit
            </button>
            <button
              className={classes.btn}
              type="button"
              onClick={() => this.deleteHandler(user._id)}
            >
              Delete
            </button>
          </div>
        </article>
      );
    });

    let grid = <div className={classes.grid}>{allArticles}</div>;

    return (
      <React.Fragment>
        {grid}
        <br />
        <br />
        <hr />
        <br />
        <UserDetails
          show={this.state.showDetails}
          showDetailsHandler={(data) => this.showDetailsHandler(data)}
          currentUser={this.state.currentUser}
        />
        <UserEdits
          show={this.state.showEdits}
          showEditsHandler={(data) => this.showEditsHandler(data)}
          currentUser={this.state.currentUser}
          counterHandler={this.counterHandler}
        />
      </React.Fragment>
    );
  }
}

export default Admin;
