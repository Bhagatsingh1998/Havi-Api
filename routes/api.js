const express = require('express');

const apiController = require('../controller/api');
const route = express.Router();

route.post('/login', apiController.postUserLogin);
route.post('/signup', apiController.postUserDetails);
route.get('/:user_id', apiController.getUserDetails);
route.post('/:user_id', apiController.postAddToDoList);
route.patch('/:user_id', apiController.patchUserUpdate);
route.delete('/:user_id', apiController.deleteUser);
route.get('/', apiController.getAllUsers);

module.exports = route;