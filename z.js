import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";

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

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: "0",
    height: "350px",
  },
}));

const useStyles3 = makeStyles((theme) => ({
  root: {
    margin: "12px",
  },
}));

const useStyles4 = makeStyles((theme) => ({
  root: {
    width: "260px",
  },
}));



class TagsDialog extends Component {

  render() {
    let alertTitle, alertBody, alertFooter;
    let selectedTags = [];
    let otherTags = [];

    let dialogClasses = useStyles();
    let dialogContentClasses = useStyles2();
    let checkboxClasses = useStyles3();
    let formLabelClasses = useStyles4();

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    this.props.tagsData.map((tag) => {
      if (this.props.personsData[this.props.personIndex].tags.includes(tag.id)) {
        selectedTags.push(
          <div key={Math.random()} className={classes.SingleTagDiv}>
            {console.log("aa")}
            <FormControlLabel
              control={
                <Checkbox checked={true} className={checkboxClasses.root} />
              }
              className={formLabelClasses.root}
              label={tag.name}
            />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      } else {
        otherTags.push(
          <div key={Math.random()} className={classes.SingleTagDiv}>
            <FormControlLabel
              control={<Checkbox className={checkboxClasses.root} onChange />}
              className={formLabelClasses.root}
              label={tag.name}
            />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      }
    });

    

  alertTitle = `Tags`;
  alertBody = (
    <>
      <div className={classes.Header}>
        <AddIcon style={{ padding: "12px 7px" }} />
        <TextField id="standard-basic" label="New Tag Name" />
        <TextField
          id="standard-basic"
          style={{ appearance: "circle-button" }}
          type="color"
          label=" "
        />
        <IconButton>
          <DoneIcon style={{ padding: "7px" }} />
        </IconButton>
      </div>
      <div>
        {selectedTags}
        {otherTags}
      </div>
    </>
  );

  alertFooter = (
    <DialogActions>
      <Button onClick={this.props.closeModalHandler} color="primary">
        Cancle
      </Button>
      <Button
        onClick={(event) => {
          this.props.closeModalHandler();
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
        open={this.props.dialogInfo.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.closeModalHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{alertTitle}</DialogTitle>
        <DialogContent className={dialogContentClasses.root}>
          {alertBody}
        </DialogContent>
        {alertFooter}
      </Dialog>
    );
  }
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
    tagsData: state.tags.tagsData,
  };
};

export default connect(mapStateToProps)(TagsDialog);
