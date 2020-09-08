import React from "react";
import { Route, NavLink } from "react-router-dom";

import classes from "./Navbar.css";
import Documentation from "./../Documentation/Documentation";
import User from "../../containers/User/User";
import Admin from "../../containers/Admin/Admin";
import Logout from "./../Logout/Logout";

const Navbar = (props) => {
  let activeDetails = props.activeUser;

  let hero = (
    <li className={classes.hero}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-clipboard-data"
        className={classes.clipboardData}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
        />
        <path
          fill-rule="evenodd"
          d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
        />
        <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
      </svg>
    </li>
  );

  let header = (
    <>
      <li className={classes.navItem} onClick={props.signinToggle}>
        LogIn
      </li>
      <li className={classes.navItem} onClick={props.signupToggle}>
        Register
      </li>
    </>
  );

  if (props.activeUser) {
    header = (
      <>
        <li className={classes.navItem} onClick={props.dashbord}>
          <NavLink
            to="/dashbord"
            activeStyle={{
              color: " #F64C72",
              fontWeight: "bolder",
            }}
          >
            {props.activeUser.userName}
          </NavLink>
        </li>
        <li className={classes.navItem} onClick={props.logout}>
          Logout
        </li>        
      </>
    );
  }

  return (
    <React.Fragment>
      <header>
        <nav>
          <ul>
            {hero}
            <li className={classes.navItem}>
              <NavLink
                to="/"
                activeClassName= "my-active"
                activeStyle={{
                  color: " #F64C72",
                  fontWeight: "bolder",
                }}
                exact
              >
                Documentation
              </NavLink>
            </li>
            {header}
          </ul>
        </nav>
      </header>
      <Route path="/" exact component={Documentation} />
      {props.activeUser.userType === "Admin" ? (
        <Route path="/dashbord"  exact component={() => <Admin activeUser={activeDetails}  />} />
      ) : (
        <Route path="/dashbord" exact component={(props) => <User activeUser={activeDetails} {...props} />} />
      )}
      <Route path="/logout" exact component={Logout} />
    </React.Fragment>
  );
};

export default Navbar;
