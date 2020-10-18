import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import EmailIcon from "@material-ui/icons/Email";
import FormHelperText from "@material-ui/core/FormHelperText";
import { connect } from "react-redux";
import * as actionTypes from "./../../store/actionTypes";

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    // margin: '50% 50%',
    // maxHeight: "100vh",
    // position: 'realtive',
    margin: "auto",
    verticalAlign: "middle",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  title: {
    fontSize: 14,
    // marginBottom: 100,
    width: "93%",
    margin: "0 auto 80px auto",
  },
}));

const formControlStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    marginBottom: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const SigninForm = (props) => {
  const cardClasses = cardStyles();
  const formControlClasses = formControlStyles();

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const togglePasswordHandler = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailErrorStatus, setEmailErrorStatus] = React.useState(false);
  const [passwordErrorStatus, setPasswordErrorStatus] = React.useState(false);

  const inputHandler = (event, field) => {
    let val;
    if (field === "email") {
      val = event.target.value;
      setEmail(val);

      if (val.length === 4) {
        setEmailErrorStatus(false);
      }
      if (val.length < 4) {
        setEmailErrorStatus(true);
      }
    }
    if (field === "password") {
      val = event.target.value;
      setPassword(val);
      if (val.length === 4) {
        setPasswordErrorStatus(false);
      }
      if (val.length < 4) {
        setPasswordErrorStatus(true);
      }
    }
  };

  let formHelperText = (
    <FormHelperText id="my-helper-text">
      Min character length is 4
    </FormHelperText>
  );

  let buttonStatus;
  if (emailErrorStatus || passwordErrorStatus) {
    buttonStatus = true;
  } else {
    buttonStatus = false;
  }

  let authUserLogInHandler = () => {
    let data = {
      email: email,
      password: password,
    };
    props.onAuthUserLogIn(data);
  };

  return (
    <Card className={cardClasses.root}>
      <CardContent>
        <Typography className={cardClasses.title} gutterBottom>
          <h1>MUI Form</h1>
        </Typography>
        <Typography variant="h5" component="h2">
          <FormControl
            error={emailErrorStatus}
            fullWidth
            className={clsx(formControlClasses.root, formControlClasses.margin)}
            variant="outlined"
          >
            <InputLabel htmlFor="email-label">Email</InputLabel>
            <OutlinedInput
              id="email-label"
              value={email}
              onChange={(e) => inputHandler(e, "email")}
              labelWidth={70}
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon style={{ color: "gray" }} />
                </InputAdornment>
              }
            />
            {emailErrorStatus ? formHelperText : null}
          </FormControl>
        </Typography>
        <br />
        <Typography>
          <FormControl
            error={passwordErrorStatus}
            fullWidth
            className={clsx(formControlClasses.root, formControlClasses.margin)}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => inputHandler(e, "password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordHandler}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            {passwordErrorStatus ? formHelperText : null}
          </FormControl>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ width: "93%", margin: "0px auto 30px auto" }}
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
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthUserLogIn: (data) =>
      dispatch({ type: actionTypes.AUTH_USER_LOGIN, data: data }),
  };
};

export default connect(null, mapDispatchToProps)(SigninForm);
