const express = require('express');
const Router = express.Router();
const Authentication = require('../controllers/Authentication');


Router.route('/signup').post(Authentication.signup);
Router.route('/login').post(Authentication.login);

module.exports = Router;