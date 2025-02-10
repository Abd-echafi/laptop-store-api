const express = require('express');
const Router = express.Router();
const notoficationController = require('../controllers/NotificationController');
const authControllers = require('../controllers/Authentication')
Router.route('/').get(authControllers.protect, notoficationController.getAllNotifications);

module.exports = Router;