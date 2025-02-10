const express = require('express');
const Router = express.Router();
const orderControllers = require('../controllers/OrderControllers');
const authControllers = require('../controllers/Authentication')
Router.route('/').get(authControllers.protect, orderControllers.getAllOrders)
Router.route('/:id').get(authControllers.protect, orderControllers.getOneOrder).patch(authControllers.protect, orderControllers.updateOrder).delete(authControllers.protect, orderControllers.daleteOrder);

module.exports = Router