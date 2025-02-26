const express = require('express');
const Router = express.Router();
const reportsController = require('../controllers/reportsControllers');
const authControllers = require('../controllers/Authentication')

Router.route('/').get(authControllers.protect, reportsController.getAllReports).post(reportsController.createReport);
Router.route('/:id').get(authControllers.protect, reportsController.getOneReport);

module.exports = Router;