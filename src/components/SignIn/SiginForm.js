import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import clsx from "clsx";
import { connect } from "react-redux";
import * as actionTypes from "./../../store/actionTypes";
import Logo from './../../assets/images/havi-site-logo.png';

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 378,
    margin: "auto",
    verticalAlign: "middle",

    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  title: {
    fontSize: 14,
    // marginBottom: 100,
    width: "93%",
    // margin: "0 auto 80px auto",
    marginTop: 30
  },
}));

const formControlStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "93%",
    marginBottom: 200,
    color: "black",
    // "&$focused": {
    //   borderColor: "black",
    // },
  },
  margin: {
    margin: theme.spacing(1),
    // borderColor: 'black'
    // "&$focused": {
    //   borderColor: "black",
    // },
  },
}));

const userStyles = makeStyles((theme) => ({
  formHeader: {
    // width: "50%",
    textAlign: "center",
    margin: "auto",
    "& h5": {
      marginTop: 30,
    },
    "& img": {
      width: 300,
      height: 100,
      objectFit: "contain"
    }
  }
}));

const SigninForm = (props) => {
  const cardClasses = cardStyles();
  const formControlClasses = formControlStyles();
  const usersClasses = userStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#192d3e",
      },
      secondary: {
        main: "#192d3",
      },
    },
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonStatus, setButtonStatus] = React.useState(true);

  const inputHandler = (event, field) => {
    let val;
    if (field === "email") {
      val = event.target.value;
      setEmail(val);
    }
    if (field === "password") {
      val = event.target.value;
      setPassword(val);
    }
    if (email && password) {
      setButtonStatus(false);
    }
  };

  let authUserLogInHandler = () => {
    let data = {
      email: email,
      password: password,
    };
    props.onAuthUserLogIn(data);
  };

  let style;
  if (!buttonStatus) {
    style = {
      width: "60%",
      margin: "0px auto 30px auto",
      backgroundColor: "#192d3e",
      color: "white",
    };
  } else {
    style = { width: "60%", margin: "0px auto 30px auto" };
  }

  return (
    <ThemeProvider theme={theme}>
      <Card className={cardClasses.root}>
        <CardContent>
          <Typography className={cardClasses.title} >
            <div className={usersClasses.formHeader}>
              <img src={Logo} alt="Logo"/>
              <h4>LOGIN TO YOUR ACCOUNT</h4>
            </div>
          </Typography>
          <Typography variant="h5" component="h2">
            <FormControl
              fullWidth
              className={clsx(
                formControlClasses.root,
                formControlClasses.margin
              )}
              variant="outlined"
            >
              <InputLabel htmlFor="email-label">Email*</InputLabel>
              <OutlinedInput
                id="email-label"
                value={email}
                onChange={(e) => inputHandler(e, "email")}
                labelWidth={70}
              />
            </FormControl>
          </Typography>
          <br />
          <Typography>
            <FormControl
              fullWidth
              className={clsx(
                formControlClasses.root,
                formControlClasses.margin
              )}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password*</InputLabel>
              <OutlinedInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => inputHandler(e, "password")}
                labelWidth={70}
              />
            </FormControl>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={style}
            variant="contained"
            color="primary"
            fullWidth
            disabled={buttonStatus}
            onClick={authUserLogInHandler}
          >
            LogIn
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthUserLogIn: (data) =>
      dispatch({ type: actionTypes.AUTH_USER_LOGIN, data: data }),
  };
};

export default connect(null, mapDispatchToProps)(SigninForm);
