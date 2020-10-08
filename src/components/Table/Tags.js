import React from "react";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import classes from "./Tags.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TagsDialog from "./TagsDialog";

const Tags = (props) => {
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

  let allTags = [];
  let pTags = props.personsData[props.personIndex].tags;
  if (pTags.length === 0) {
    allTags = (
      <IconButton onClick={() => openModalHandler("edit")}>
        <AddIcon />
      </IconButton>
    );
  } else {
    allTags = pTags.map((tag) => {
      for (let i = 0; i < props.tagsData.length; i++) {
        if (+props.tagsData[i].id === +tag) {
          return (
            <div
              onClick={() => openModalHandler("edit")}
              key={Math.random()}
              className={classes.TagDiv}
            >
              <FiberManualRecordIcon
                style={{
                  fill: props.tagsData[i].color,
                  fontSize: "small",
                  height: "10px",
                  width: "10px",
                }}
              />
              <span className={classes.TagName}>{props.tagsData[i].name}</span>
            </div>
          );
        }
      }
    });
    allTags.push(
      <IconButton key={Math.random()}>
        <AddIcon />
      </IconButton>
    );
  }
  return (
    <TableCell>
      {dialogInfo.status ? (
        <TagsDialog
          personIndex={props.personIndex}
          personId={props.personId}
          dialogInfo={dialogInfo}
          closeModalHandler={closeModalHandler}
        />
      ) : null}
      <div className={classes.TagsHolder}>{allTags}</div>
    </TableCell>
  );
};

// const mapDispatchToProps = state => {
//   return;
// }

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
    tagsData: state.tags.tagsData,
  };
};
export default connect(mapStateToProps)(Tags);
