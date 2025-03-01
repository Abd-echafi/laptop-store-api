const express = require('express');
const Router = express.Router();
const laptopControllers = require('../controllers/laptopControllers');
const authControllers = require('../controllers/Authentication');
const Cloudinary = require('../config/cloudinary');
const upload = require("../middleware/multer");

Router.route('/')
    .get(laptopControllers.getAllLaptops)
    .post(authControllers.protect, upload.array("images"), Cloudinary.uploadMultiple, laptopControllers.addLaptop);

Router.route('/:id').get(laptopControllers.getOneLaptop).patch(authControllers.protect, upload.array("images"), Cloudinary.uploadMultiple, laptopControllers.updateLaptop).delete(authControllers.protect, laptopControllers.daleteLaptop);
module.exports = Router;