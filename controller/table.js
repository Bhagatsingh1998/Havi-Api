const Rows = require('./../modal/tableModal');
const baseURL = require('./../baseURL').baseURL;

exports.getAllRows = (req, res, next) => {
  Rows.find()
  .then(rows => {
    return res.status(200).json({
      statusCode: 200,
      status: 'Success',
      message: 'Data of all rows',
      optional: {
        rowsData: rows
      },
      req: {
        url: `${baseURL}/table`,
        verb: 'POST'
      }
    })
  })
}

exports.postRow = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name || null;
  const surname= req.body.surname || null;
  const birthYear = req.body.birthYear || null;
  const birthCity = req.body.birthCity || null;
  const tableData = req.body.tableData || null;


  const newRow = new Rows({
    name: name,
    surname: surname,
    birthYear: birthYear,
    birthCity: birthCity,
    tableData: tableData
  });
  
  newRow.save()
  .then(savedData => {
    console.log(savedData);
    return res.status(200).json({
      statusCode: 200,
      status: 'Success',
      message: 'Data to row saved successfully',
      optional: {
        rowAdded: savedData
      },
      req: {
        url: `${baseURL}/table`,
        verb: 'POST'
      }
    });
  })
  .catch(error => {
    console.log(error);
    next(error);
  });
}

exports.patchRow = (req, res, next) => {
  const row_id = req.params.row_id;
  console.log(row_id);

  Rows.findById(row_id)
  .then(row => {
    console.log(row);
    const name = req.body.name || null;
    const surname= req.body.surname || null;
    const birthYear = req.body.birthYear || null;
    const birthCity = req.body.birthCity || null;
    const tableData = req.body.tableData || null;

    row.name= name,
    row.surname = surname,
    row.birthYear = birthYear,
    row.birthCity = birthCity,
    row.tableData = tableData

    return row.save()
  })
  .then(savedData => {
    console.log(savedData);
    return res.status(200).json({
      statusCode: 200,
      status: 'Success',
      message: 'Row Data updated successfully',
      optional: {
        rowUpdated: savedData
      },
      req: {
        url: `${baseURL}/table/${row_id}`,
        verb: 'PATCH'
      }
    });
  })
  .catch(error => {
    console.log(error);
  })
}

exports.deleteRow = (req, res, next) => {
  const row_id = req.params.row_id;
  console.log(row_id);

  Rows.findByIdAndDelete(row_id)
  .then(savedData => {
    return res.status(200).json({
      statusCode: 200,
      status: 'Success',
      message: 'Row Data deleted successfully',
      optional: {
        rowDeleted: savedData
      },
      req: {
        url: `${baseURL}/table/${row_id}`,
        verb: 'DELETE'
      }
    });
  })
  .catch(error => {
    console.log(error);
  });
}

