import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import DoneIcon from "@material-ui/icons/Done";
import classes from "./TagsDialog.css";
import IconButton from "@material-ui/core/IconButton";
import * as actionTypes from "./../../store/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    width: "400px",
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TagsDialog = (props) => {
  const dialogClasses = useStyles();
  const formClasses = useStyles1();
  let alertFooter, alertBody, alertTitle;

  alertTitle = `Tags`;

  alertBody = (
    <>
      <div className={classes.Header}>
        <AddIcon style={{padding:'12px'}} />
        <form className={formClasses.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="New Tag Name" />
        </form>
        <IconButton>
          <DoneIcon />
        </IconButton>
      </div>
      <div>
        
      </div>
    </>
  );

  alertFooter = (
    <DialogActions>
      <Button onClick={props.closeModalHandler} color="primary">
        Cancle
      </Button>
      <Button
        onClick={(event) => {
          props.closeModalHandler();
        }}
        color="primary"
      >
        Update
      </Button>
    </DialogActions>
  );

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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onEditPersonDetails: (personData) =>
//       dispatch({ type: actionTypes.EDIT_PERSON_DETAILS, data: personData }),
//     onEditPersonNote: (noteData) =>
//       dispatch({ type: actionTypes.EDIT_PERSON_NOTE, data: noteData }),
//   };
// };

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
  };
};

export default connect(mapStateToProps)(TagsDialog);
