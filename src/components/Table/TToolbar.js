import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddPersonDialog from "./AddPersonDialog";
import { connect } from "react-redux";
import * as actionTypes from "./../../store/actionTypes";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const TToolbar = (props) => {
  const classes = useToolbarStyles();
  const { personsSelected } = props;
  console.log(personsSelected);

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

  const searchHandler = (event) => {
    console.log("searchHandler", event);
    let val = event.target.value;
    val = val.toLowerCase();
    console.log(val);
    let postiveSearches = [];
    props.personsData.map((personData) => {
      if (
        personData.fname.toLowerCase().includes(val) ||
        personData.lname.toLowerCase().includes(val) ||
        personData.doy.toString().includes(val) ||
        personData.city.toLowerCase().includes(val) ||
        personData.note.toLowerCase().includes(val)
      ) {
        postiveSearches.push(personData);
      }
    });
    // props.tagsData.map(tag => {
    //   if(tag.name.toLowerCase().includes(val)) {
    //     postiveSearches.push(tag);
    //   }
    // })
    props.searchResultsHandler(postiveSearches);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: personsSelected.length > 0,
      })}
    >
      {personsSelected.length > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {personsSelected.length} selected
        </Typography>
      ) : (
        <>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            MUI Table
          </Typography>
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={searchHandler}
          />
        </>
      )}

      {personsSelected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => props.ondeleteselectedPersons(personsSelected)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            aria-label="filter list"
            onClick={() => openModalHandler("add")}
          >
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      )}

      {dialogInfo.status ? (
        <AddPersonDialog
          dialogInfo={dialogInfo}
          closeModalHandler={closeModalHandler}
        />
      ) : null}
    </Toolbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    ondeleteselectedPersons: (personsId) =>
      dispatch({ type: actionTypes.DELETE_SELECTED_PERSONS, data: personsId }),
  };
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
    tagsData: state.tags.tagsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TToolbar);
