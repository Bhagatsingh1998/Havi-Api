import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import * as actionTypes from "./../../store/actionTypes";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Container from "@material-ui/core/Container";
import { ReactSortable } from "react-sortablejs";

const useStyles4 = makeStyles({
  root: {
    width: "180px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TAccordion = (props) => {
  const cardClasses = useStyles4();

  const [state, setState] = React.useState([
    { id: "fname", numeric: false, disablePadding: true, label: "Name" },
    { id: "lname", numeric: false, disablePadding: true, label: "Surname" },
    { id: "boy", numeric: true, disablePadding: true, label: "Birth Year" },
    { id: "city", numeric: false, disablePadding: true, label: "City" },
    { id: "actions", numeric: false, disablePadding: true, label: "Actions" },
    { id: "tags", numeric: false, disablePadding: true, label: "Tags" },
    { id: "info1", numeric: false, disablePadding: true, label: "Info 1" },
    { id: "info2", numeric: false, disablePadding: true, label: "Info 2" },
    { id: "file", numeric: false, disablePadding: true, label: "File" },
  ]);

  const [cardDisplay, setCardDisplay] = React.useState(false);

  let setStateHandler = data => {
    // console.log(data);
    setState(data);
    props.onChangeColOrder(data);
  }

  let onResetAllColumnsHandler = () => {
    props.onResetAllColumns();
    setState([
      { id: "fname", numeric: false, disablePadding: true, label: "Name" },
      { id: "lname", numeric: false, disablePadding: true, label: "Surname" },
      { id: "boy", numeric: true, disablePadding: true, label: "Birth Year" },
      { id: "city", numeric: false, disablePadding: true, label: "City" },
      { id: "actions", numeric: false, disablePadding: true, label: "Actions" },
      { id: "tags", numeric: false, disablePadding: true, label: "Tags" },
      { id: "info1", numeric: false, disablePadding: true, label: "Info 1" },
      { id: "info2", numeric: false, disablePadding: true, label: "Info 2" },
      { id: "file", numeric: false, disablePadding: true, label: "File" },
    ]);
  }

  const eachColumn = (columnData) => {
    return (
      <div
        key={columnData.id}
        style={{
          color: "#61dafb",
          marginRight: 20,
          borderRadius: 10,
          fontSize: 15,
          cursor: "move",
          backgroundColor: "#f5f5f5",
          padding: "2px 0px 2px 10px",
          borderRadius: 5,
          margin: "2px auto 0px auto"
        
        }}
      >
        {columnData.label}
      </div>
    );
  };

  let card = (
    <Card className={cardClasses.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <ReactSortable 
            animation={200}
            delayOnTouchStart={true}
            delay={2}
            list={state} 
            setList={(data) => setStateHandler(data)}>
            {state.map((item) => eachColumn(item))}
          </ReactSortable>
        </Typography>
      </CardContent>
      <CardActions style={{color:"red", marginLeft: "30%"}}>
        <Button  size="medium" onClick={onResetAllColumnsHandler}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );

  let expandMore = (
    <IconButton onClick={() => setCardDisplay(!cardDisplay)}>
      <ExpandMoreIcon />
    </IconButton>
  );

  let expandLess = (
    <IconButton onClick={() => setCardDisplay(!cardDisplay)}>
      <ExpandLessIcon />
    </IconButton>
  );

  return (
    <Container>
      <Grid
        container={true}
        alignContent="flex-end"
        alignItems="flex-end"
        direction="column"
      >
        <div
        style={{position: "relative", top: 10, left: 10, marginBottom: 40}}
        >
        <div >{cardDisplay ? expandLess : expandMore}</div>
        {cardDisplay ? card : null}
        </div>
        
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeColOrder: (columnState) =>
      dispatch({ type: actionTypes.CHANGE_COL_ORDER, data: columnState }),
    onResetAllColumns: () => dispatch({ type: actionTypes.RESET_ALL_COLUMNS }),
  };
};

const mapStateToProps = (state) => {
  return {
    tableHeaderData: state.theaders.tableHeaderData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TAccordion);
