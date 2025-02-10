const express = require('express');
const Router = express.Router();
const checkoutControllers = require('../controllers/CheckoutControllers');
Router.route('/').post(checkoutControllers.makeOrder);

module.exports = Router;