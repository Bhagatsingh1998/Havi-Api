import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import SigninForm from "./SiginForm";

const containerStyles = makeStyles({
  mainDiv: {
    backgroundColor: "black",
    opacity: 0.8,
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
});

const SignIn = () => {
  const containerClasses = containerStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={containerClasses.mainDiv}>
        <SigninForm />
      </div>
    </React.Fragment>
  );
};

export default SignIn;
