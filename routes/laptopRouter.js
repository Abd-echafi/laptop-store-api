const express = require('express');
const Router = express.Router();
const laptopControllers = require('../controllers/laptopControllers');
const authControllers = require('../controllers/Authentication')
Router.route('/').get(laptopControllers.getAllLaptops).post(authControllers.protect, laptopControllers.addLaptop);
Router.route('/:id').get(laptopControllers.getOneLaptop).patch(authControllers.protect, laptopControllers.updateLaptop).delete(authControllers.protect, laptopControllers.daleteLaptop);
module.exports = Router;