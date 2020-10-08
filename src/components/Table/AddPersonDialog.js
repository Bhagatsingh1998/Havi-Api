import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    width: "350px",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  paperWidthSm: {
    maxWidth: "100%",
    width: "100%",
    margin: "0",
  },
  paper: {
    margin: "0",
  },
}));

const useStyles3 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddPersonDialog = (props) => {
  const dialogClasses = useStyles1();
  const formClasses = useStyles();
  const selectClasses = useStyles3();

  let [fname, setFname] = React.useState('');
  let [lname, setLname] = React.useState('');
  let [doy, setDoy] = React.useState('');
  let [city, setCity] = React.useState('');
  let [note, setNote] = React.useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const valueChangeHandler = (e, targetTextField) => {
    let val = e.target.value;
    if (targetTextField === "fname") {
      setFname(val);
    }
    if (targetTextField === "lname") {
      setLname(val);
    }
    if (targetTextField === "doy") {
      setDoy(val);
    }
    if (targetTextField === "note") {
      setNote(val);
    }
  };

  let alertBody, alertTitle, alertFooter;

  if (props.dialogInfo.triggerAction === "add") {
    alertTitle = "Add Person";
    alertBody = (
      <form className={formClasses.root} noValidate autoComplete="off">
        <TextField
          id="basic"
          label="First Name"
          onChange={(event) => valueChangeHandler(event, "fname")}
        />
        <TextField
          id="standard-basic"
          label="Surname"
          onChange={(event) => valueChangeHandler(event, "lname")}
        />
        <TextField
          id="filled-number"
          label="Birth Year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => valueChangeHandler(event, "doy")}
        />
        <FormControl className={selectClasses.formControl}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
          >
            <MenuItem value={"Delhi"}>Delhi</MenuItem>
            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-multiline-static"
          label="Note"
          multiline
          rows={3}
          onChange={(event) => valueChangeHandler(event, "note")}
        />
      </form>
    );

    alertFooter = (
      <DialogActions>
        <Button onClick={props.closeModalHandler} color="primary">
          Cancle
        </Button>
        <Button
          onClick={(event) => {
            props.closeModalHandler(event, personData);
            props.onAddPersonDetails(personData);
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    );
  }

  let personData = {
    id: Math.random(),
    fname: fname,
    lname: lname,
    doy: doy,
    city: city,
    note: note,
    tags: []
  };

  return (
    <Dialog
      className={dialogClasses.root}
      open={props.dialogInfo.status}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.closeModalHandler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{alertTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        {alertBody}
      </DialogContent>
        {alertFooter}
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPersonDetails: (personData) =>
      dispatch({ type: actionTypes.ADD_PERSON_DETAILS, data: personData }),
  };
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonDialog);
