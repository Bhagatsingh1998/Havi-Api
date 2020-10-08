import React from "react";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PersonDialog from "./PersonDialog";
import NotesIcon from "@material-ui/icons/Notes";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from "react-redux";
import * as actionTypes from './../../store/actionTypes';

const Actions = (props) => {
  const [dialogInfo, setDialogInfo] = React.useState({
    status: false,
    triggerAction: "",
  });
  const openModalHandler = (action) => {
    setDialogInfo({ status: true, triggerAction: action });
  };
  const closeModalHandler = (e, data) => {
    if (data) {
      // console.log(data);
    }
    setDialogInfo({ status: false, triggerAction: "" });
  };

  if(props.status === 'delete') {
    return (
      <TableCell>
        <IconButton 
          onClick={() => {props.onDeletePerson({personId: props.personId, pIndex: props.personIndex}); props.personDeleteHandler(null) }}>
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => props.personDeleteHandler(null)}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    );
  }

  return (
    <TableCell>
      {dialogInfo.status ? (
        <PersonDialog
          personIndex={props.personIndex}
          personId={props.personId}
          dialogInfo={dialogInfo}
          closeModalHandler={closeModalHandler}
        />
      ) : null}
      <IconButton onClick={() => openModalHandler("edit")}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => props.personDeleteHandler(props.personId)} >
        <DeleteIcon />
      </IconButton>
      {props.personsData[props.personIndex].note ? (
        <IconButton onClick={() => openModalHandler("note")}>
          <NotesIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => openModalHandler("note")}>
          <NoteAddIcon />
        </IconButton>
      )}
    </TableCell>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePerson: (data) => 
      dispatch({type: actionTypes.DELETE_PERSON, data: data}) 
  };
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
