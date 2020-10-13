import React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TagsDialog = (props) => {
  const dialogClasses = useStyles();
  const dialogContentClasses = useStyles2();
  const checkboxClasses = useStyles3();
  const formLabelClasses = useStyles4();

  let selectedTags = [];
  let otherTags = [];
  let st = {};
  let ot = {};

  const [newTagName, setNewTagName] = React.useState("");
  const [newTagColor, setNewTagColor] = React.useState("#000000");

  const newTagNameHandler = (event) => {
    let val = event.target.value;
    setNewTagName(val);
  };

  const newTagColorHandler = (event) => {
    // console.log("newTagColorHandler", event);
    // console.log(event.target.value);
    let val = event.target.value;
    setNewTagColor(val);
  };

  let tagData = {
    id: Math.random(),
    name: newTagName,
    color: newTagColor,
    pIndex: props.personIndex,
    pId: props.personId,
  };

  const enterKeyHandler = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      props.onAddTag(tagData);
      setNewTagName("");
      // changeHandler()
      // props.closeModalHandler();
    }
  };

  const onAddTagHandler = () => {
    props.onAddTag(tagData);
    setNewTagName("");
    // changeHandler()
    // props.closeModalHandler();
  };

  const deleteTagHandler = (tagId, tagIndex) => {
    let data = {
      tagId: tagId,
      tagIndex: tagIndex,
    };
    props.onDeleteTag(data);
  };

  props.tagsData.map((tag) => {
    let tagName = `tag_${tag.id}`;
    if (props.personsData[props.personIndex].tags.includes(tag.id)) {
      st[tagName] = true;
    } else {
      ot[tagName] = false;
    }
  });

  const [checkedState, setCheckedState] = React.useState({ ...st, ...ot });

  const changeHandler = (event, tagName) => {
    setCheckedState(() => {
      let a = { ...checkedState };
      if (tagName) {
        a[tagName] = !a[tagName];
      }
      return a;
    });
  };
  // console.log(props.tagsData);
  // console.log(props.personsData[props.personIndex].tags);

  // console.log(checkedState);
  React.useEffect(() => {
    setCheckedState(() => {
      let a = { ...st, ...ot };
      return a;
    });
  }, [Object.keys(st).length]);

  props.tagsData.map((tag, tagIndex) => {
    let tagName = `tag_${tag.id}`;
    // console.log(checkedState);
    if (props.personsData[props.personIndex].tags.includes(tag.id)) {
      // console.log(checkedState[tagName]);
      selectedTags.push(
        <div key={Math.random()} className={classes.SingleTagDiv}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedState[tagName]}
                onChange={(event) => changeHandler(event, tagName)}
                className={checkboxClasses.root}
              />
            }
            className={formLabelClasses.root}
            label={tag.name}
          />
          <IconButton onClick={() => deleteTagHandler(tag.id, tagIndex)}>
            <DeleteIcon />
          </IconButton>
        </div>
      );
    } else {
      otherTags.push(
        <div key={Math.random()} className={classes.SingleTagDiv}>
          <FormControlLabel
            control={
              <Checkbox
                className={checkboxClasses.root}
                onChange={(event) => changeHandler(event, tagName)}
                checked={checkedState[tagName]}
              />
            }
            className={formLabelClasses.root}
            label={tag.name}
          />
          <IconButton onClick={() => deleteTagHandler(tag.id, tagIndex)}>
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }
  });

  let alertFooter, alertBody, alertTitle;
  alertTitle = `Tags`;
  alertBody = (
    <>
      <div className={classes.Header}>
        <AddIcon style={{ padding: "12px 7px" }} />
        <TextField
          value={newTagName}
          onChange={newTagNameHandler}
          onKeyDown={enterKeyHandler}
          id="standard-basic"
          label="New Tag Name"
        />
        <TextField type="color" onChange={newTagColorHandler} label=" " />
        <IconButton onClick={onAddTagHandler}>
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
    <Button
        onClick={
          props.closeModalHandler
        }
        color="primary"
      >
        Cancle
      </Button>
      
      <Button
        onClick={(event) => {
          props.closeModalHandler(event, checkedState);
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
      onClose={() => props.closeModalHandler(undefined, checkedState)}
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTag: (tagData) =>
      dispatch({ type: actionTypes.ADD_TAG, data: tagData }),
    onDeleteTag: (tagData) =>
      dispatch({ type: actionTypes.DELETE_TAG, data: tagData }),
  };
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
    tagsData: state.tags.tagsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsDialog);
