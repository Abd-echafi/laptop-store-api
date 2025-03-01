const express = require('express');
const Router = express.Router();
const Authentication = require('../controllers/Authentication');
const UserControllers = require('../controllers/UserControllers')
const Cloudinary = require('../config/cloudinary');
const upload = require("../middleware/multer");

Router.route('/signup').post(Authentication.protect, Authentication.signup);
Router.route('/login').post(Authentication.login);
Router.route('/').get(Authentication.protect, UserControllers.getOneUser).patch(Authentication.protect, upload.single("image"), Cloudinary.uploadSingle, UserControllers.updateUser)
module.exports = Router;