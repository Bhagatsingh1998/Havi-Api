import { connect } from "react-redux";
import THeader from "./THeader";
import TPagination from "./TPagination";
import Checkbox from "@material-ui/core/Checkbox";
import TToolbar from "./TToolbar";
import Actions from "./Actions";
import Tags from "./Tags";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const WholeTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let setPageHandler = (newPage) => {
    setPage(newPage);
  };

  let setRowsPerPageHandler = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [deleteConfirm, setdeleteConfirm] = React.useState({
    status: false,
    pId: null,
  });

  const personDeleteHandler = (personIndex) => {
    // console.log('personDeleteHandler', personIndex);
    if (personIndex) {
      setdeleteConfirm({
        status: true,
        pId: personIndex,
      });
    } else {
      setdeleteConfirm({
        status: false,
        pId: null,
      });
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.personsData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <TToolbar numSelected={selected.length} />
      <Table className={classes.table} aria-label="persons table">
        <THeader
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={props.personsData.length}
        />
        <TableBody>
          {stableSort(props.personsData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((person, index) => {
              const isItemSelected = isSelected(person.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              if (+person.id === +deleteConfirm.pId) {
                {
                  /* console.log('same', +deleteConfirm.pId) */
                }
                return (
                  <TableRow
                    key={person.id}
                    hover
                    // onClick={(event) => handleClick(event, person.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>
                      Are you sure you want to delete this row?
                    </TableCell>
                    <Actions
                      personId={person.id}
                      personIndex={index}
                      status="delete"
                      personDeleteHandler={(data) => personDeleteHandler(data)}
                    />
                  </TableRow>
                );
              }
              return (
                <TableRow
                  key={person.id}
                  hover
                  // onClick={(event) => handleClick(event, person.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                      onClick={(event) => handleClick(event, person.id)}
                    />
                  </TableCell>
                  <TableCell>{person.fname}</TableCell>
                  <TableCell>{person.lname}</TableCell>
                  <TableCell>{person.doy}</TableCell>
                  <TableCell>{person.city}</TableCell>
                  <Actions
                    personId={person.id}
                    personDeleteHandler={(personIndex) =>
                      personDeleteHandler(personIndex)
                    }
                    personIndex={index}
                  />
                  <Tags personId={person.id} personIndex={index} />
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TPagination
            totalPersons={props.personsData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            setPageHandler={setPageHandler}
            setRowsPerPageHandler={setRowsPerPageHandler}
          />
        </TableFooter>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
  };
};

export default connect(mapStateToProps)(WholeTable);
