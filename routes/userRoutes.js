const express = require('express');
const Router = express.Router();
const Authentication = require('../controllers/Authentication');
const UserControllers = require('../controllers/UserControllers')

Router.route('/signup').post(Authentication.protect, Authentication.signup);
Router.route('/login').post(Authentication.login);
Router.route('/').get(Authentication.protect, UserControllers.getOneUser).patch(Authentication.protect, UserControllers.updateUser)
module.exports = Router;