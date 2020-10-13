import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Tags from './Tags';
import { connect } from "react-redux";

const AdditionalData = (props) => {
  const { open, personId, personIndex } = props;

  let allHeaders = props.tableHeaderData.concat();
  let subHeadersArr = allHeaders.slice(6);
  let sunHeader = subHeadersArr.map((header) => {
    return <TableCell key={Math.random()}>{header.label}</TableCell>;
  });

  let subColumnData = (columnNum, person, index) => {
    let colLabel = props.tableHeaderData[columnNum -1].label;
    if(colLabel === 'Name') {
      return person.fname;
    } else if(colLabel === 'Surname') {
      return person.lname;
    } else if(colLabel === 'City') {
      return person.city;
    } else if(colLabel === 'Birth Year') {
      return person.doy;
    } else if(colLabel === 'Actions') {
      return 'Restricted';
    } else if(colLabel === 'Tags') {
      return (<Tags
        style={{ width: "100px" }}
        personId={person.id}
        personIndex={index}
      />);
    } else if(colLabel === 'Info 1') {
      return person.otherInfo.info1;
    } else if(colLabel === 'Info 2') {
      return person.otherInfo.info2;
    } else if(colLabel === 'File') {
      return (
        <a
          href={require(`./../../assets/files/${person.files.file1}`)}
        >
          {person.files.file1}
        </a>
      );
    }
}

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="h6" gutterBottom component="div">
              Other Data
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {sunHeader}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    {subColumnData(7, props.personsData[personIndex],personIndex)}
                  </TableCell>
                  <TableCell>
                  {subColumnData(8, props.personsData[personIndex],personIndex)}
                  </TableCell>
                  <TableCell>
                  {subColumnData(9, props.personsData[personIndex],personIndex)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    personsData: state.persons.personsData,
    tableHeaderData: state.theaders.tableHeaderData,
  };
};

export default connect(mapStateToProps)(AdditionalData);
