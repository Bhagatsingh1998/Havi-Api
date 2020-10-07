import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const Tags = () => {
  return (
    <TableCell>
      <IconButton>
        <AddIcon />
      </IconButton>
    </TableCell>
  );
}

export default Tags;