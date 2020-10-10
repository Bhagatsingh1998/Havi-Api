import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headerCells = [
  { id: 'fname', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'lname', numeric: false, disablePadding: true, label: 'Surname' },
  { id: 'doy', numeric: true, disablePadding: true, label: 'Birth Year' },
  { id: 'city', numeric: false, disablePadding: true, label: 'City' },
  { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
  { id: 'tags', numeric: false, disablePadding: true, label: 'Tags'}
];

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     backgroundColor: 'red',
//     position: 'sticky',
//     top: 100
//   }
// }));

const THeader = (props) => {
  // const headerClasses = useStyles1();

  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
    >
      <TableRow>
        <TableCell padding="checkbox" />
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all persons" }}
          />
        </TableCell>
        {headerCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong> 
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default THeader;
