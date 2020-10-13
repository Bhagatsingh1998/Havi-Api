import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));


const THeader = (props) => {
  const headerClasses = useStyles();

  const {
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

  const sortLabel = (headCell) => {
    return (
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        <strong>{headCell.label}</strong> 
        {orderBy === headCell.id ? (
          <span className={headerClasses.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    );
  }

  let theaders = props.tableHeaderData.concat();
  theaders.length = 6;

  return (
    <TableHead
    style={{marginTop: '900px'}}
    >
      <TableRow>
        <TableCell padding="checkbox" />
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all persons" }}
            style={{paddingBottom: 5}}
          />
        </TableCell>
        {theaders.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{paddingBottom: 5}}
          >
            {sortLabel(headCell)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const mapStateToProps = state => {
  return {
    tableHeaderData: state.theaders.tableHeaderData
  }
}

export default connect(mapStateToProps)(THeader);
