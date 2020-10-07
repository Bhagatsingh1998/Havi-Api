import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    width: '350px',
    margin: 'auto',
    alignItems:'center',justifyContent:'center'
  },
  paperWidthSm: {
    maxWidth: '100%',
    width: '100%',
    margin: '0'
  },
  paper: {
    margin: '0'
  }
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
  // console.log(props.dialogInfo);
  const dialogClasses = useStyles1();
  const formClasses = useStyles();
  const selectClasses = useStyles3();

  let person, personIndex;
  // console.log(props.personsData);
  // console.log(typeof(props.personsData));

  props.personsData.some((el,i) => {
    console.log(el);
    if(+props.personsData[i].id === +props.personId) {
      person = props.personsData[i];
      personIndex = i;
      console.log(person);
      return true;
    }
  })
  console.log(person.city);
  const [doy, setDoy] = React.useState(person.city);
  const handleChange = (event) => {
    setDoy(event.target.value);
  };

  let alertBody, alertTitle, alertFooter;

  if(props.dialogInfo.triggerAction === 'edit') {
    alertTitle = 'Edit Person';
    alertFooter = {leftBtn: 'Cancle', rightBtn: 'Update'}
    alertBody = 
      <form className={formClasses.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="First Name" value={person.fname} />
        <TextField id="standard-basic" label="Surname" value={person.lname} />
        <TextField
          id="filled-number"
          label="Birth Year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={person.doy}
        />
        <FormControl className={selectClasses.formControl}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={doy}
            onChange={handleChange}
          >
        
            <MenuItem value={'Delhi'}>Delhi</MenuItem>
            <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-multiline-static"
          label="Note"
          multiline
          rows={3}
          defaultValue={person.note}
        />
      </form>;
  }

  if(props.dialogInfo.triggerAction === 'note') {
    alertTitle = 'Note';
    alertFooter = {leftBtn: 'Close', rightBtn: 'Save'}
    alertBody = 
      <form className={formClasses.root} noValidate autoComplete="off">
        <TextField
          id="standard-multiline-static"
          label="Note"
          multiline
          rows={3}
          defaultValue={person.note}
        />
      </form>;
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
      <DialogTitle id="alert-dialog-slide-title">
        {alertTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          
        </DialogContentText>
        {alertBody}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeModalHandler} color="primary">
          {alertFooter.leftBtn}
        </Button>
        <Button onClick={props.closeModalHandler} color="primary">
          {alertFooter.rightBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    personsData: state.personsData,
  };
};

export default connect(mapStateToProps)(EditPerson);

