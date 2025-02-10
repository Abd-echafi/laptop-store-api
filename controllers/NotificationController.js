const AppError = require('../utils/errorClass');
const Notification = require('../models/notificationModel');
const APIFeautures = require('../utils/feautures');

exports.getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ active: true });
        res.status(200).json({
            status: "success",
            notifications,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}
