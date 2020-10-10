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
import * as actionTypes from "./../../store/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    width: "450px",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  // paperWidthSm: {
  //   maxWidth: "100%",
  //   width: "100%",
  //   margin: "0",
  // },
  // paper: {
  //   margin: "0",
  // },
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

const EditPerson = (props) => {
  const dialogClasses = useStyles1();
  const formClasses = useStyles();
  const selectClasses = useStyles3();

  let person = props.personsData[props.personIndex];

  let [fname, setFname] = React.useState(person.fname);
  let [lname, setLname] = React.useState(person.lname);
  let [doy, setDoy] = React.useState(person.doy);
  let [city, setCity] = React.useState(person.city);
  let [note, setNote] = React.useState(person.note);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const valueChangeHandler = (e, targetTextField) => {
    // console.log('valueChangeHandler', e);
    // console.log(e.target.value);
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

  if (props.dialogInfo.triggerAction === "edit") {
    alertTitle = "Edit Person";
    // alertFooter = { leftBtn: "Cancle", rightBtn: "Update" };
    alertBody = (
      <form className={formClasses.root} noValidate autoComplete="off">
        <TextField
          id="basic"
          label="First Name"
          value={fname}
          onChange={(event) => valueChangeHandler(event, "fname")}
        />
        <TextField
          id="standard-basic"
          label="Surname"
          value={lname}
          onChange={(event) => valueChangeHandler(event, "lname")}
        />
        <TextField
          id="filled-number"
          label="Birth Year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={doy}
          onChange={(event) => valueChangeHandler(event, "doy")}
        />
        <FormControl className={selectClasses.formControl}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
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
          defaultValue={note}
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
            props.onEditPersonDetails(personData);
          }}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    );
  }

  if (props.dialogInfo.triggerAction === "note") {
    alertTitle = "Note";
    alertBody = (

      <form className={formClasses.root} noValidate autoComplete="on">
        <TextField
        style={{width: 300}}
          id=""
          label="Note"
          multiline
          rows={3}
          defaultValue={note}
          onChange={(event) => valueChangeHandler(event, "note")}
        />
      </form> 
    );
    alertFooter = (
      <DialogActions>
        <Button onClick={props.closeModalHandler} color="primary">
        Close
        </Button>
        <Button
          onClick={(event) => {
            props.closeModalHandler(event);
            props.onEditPersonNote(noteData);
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    );
  }

  let personData = {
    id: person.id,
    fname: fname,
    lname: lname,
    doy: doy,
    city: city,
    note: note,
    tags: person.tags,
    pIndex: props.personIndex,
  };

  let noteData = {
    id: person.id,
    pIndex: props.personIndex,
    note: note
  }

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
    onEditPersonDetails: (personData) =>
      dispatch({ type: actionTypes.EDIT_PERSON_DETAILS, data: personData }),
    onEditPersonNote: (noteData) =>
      dispatch({ type: actionTypes.EDIT_PERSON_NOTE, data: noteData }),
  };
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
