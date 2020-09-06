const express = require('express');

const apiController = require('../controller/api');
const route = express.Router();

route.get('/', apiController.getAllUsers);
route.post('/', apiController.postUserDetails);

module.exports = route;