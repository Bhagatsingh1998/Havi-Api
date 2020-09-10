const express = require('express');

const tableController = require('../controller/table');
const route = express.Router();

route.patch('/:row_id', tableController.patchRow);
route.delete('/:row_id', tableController.deleteRow);
route.post('/', tableController.postRow);
route.get('/', tableController.getAllRows);

module.exports = route;