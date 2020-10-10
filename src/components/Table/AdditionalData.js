import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

const AdditionalData = (props) => {
  const { open, personId, personIndex } = props;

  let otherInfo = [];
  let files = [];

  for (let info in props.personsData[personIndex].otherInfo) {
    // console.log(props.personsData[personIndex].otherInfo[info]);
    otherInfo.push(props.personsData[personIndex].otherInfo[info]);
  }

  for (let file in props.personsData[personIndex].files) {
    // console.log(props.personsData[personIndex].files[file]);
    files.push(props.personsData[personIndex].files[file]);
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box margin={1}> */}
              <Typography variant="h6" gutterBottom component="div">
                Other Data
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Heading 1</TableCell>
                    <TableCell>Heading 2</TableCell>
                    <TableCell>Heading 3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    {otherInfo.map((info) => (
                      <TableCell key={Math.random()}>{info}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    {files.map((file) => (
                      <TableCell key={Math.random()}>
                        <a
                          href={require(`./../../assets/files/${file}`)}
                          target="_blank"
                        >
                          {file}
                        </a>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            {/* </Box> */}
          </Collapse>
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
    tagsData: state.tags.tagsData,
  };
};

export default connect(mapStateToProps)(AdditionalData);
