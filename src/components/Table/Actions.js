import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonDialog from './PersonDialog';


const Actions = (props) => {
  const [dialogInfo, setDialogInfo] = React.useState({status: false, triggerAction: ''});
  const openModalHandler = (action) => {
    setDialogInfo({status: true, triggerAction: action});
  };
  const closeModalHandler = () => {
    setDialogInfo({status: false, triggerAction: ''});
  };

  return (
    <TableCell>
      {dialogInfo.status ? <PersonDialog personId={props.personId} dialogInfo={dialogInfo} closeModalHandler={closeModalHandler} /> : null}
      <IconButton onClick={() => openModalHandler('edit')}>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => openModalHandler('note')}>
        <NoteAddIcon />
      </IconButton>
    </TableCell>
  )
}

export default Actions;
