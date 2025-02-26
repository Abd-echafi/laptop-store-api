const AppError = require('../utils/errorClass');
const Notification = require('../models/notificationModel');
const APIFeautures = require('../utils/feautures');
const Report = require('../models/reportModel');
const User = require('../models/userModel');
const { getIO } = require('../socketIO')
exports.getAllReports = async (req, res, next) => {
    try {
        const reports = new APIFeautures(Report.find(), req.query).filter().sort().paginate();
        const finalReports = await Report.query.exec();
        res.status(200).json({
            status: "success",
            finalReports,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.getOneReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params);
        res.status(200).json({
            status: "success",
            report,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.createReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body);
        //create the notification object and document in the DB
        const admins = await User.find();
        let adminIds = [];
        admins.forEach((el, i) => {
            adminIds[i] = el._id;
        })
        let notificationObj = { adminIds, type: "Report", message: "Report" };
        const notification = await Notification.create(notificationObj);
        // Emit a real-time notification to all admins
        const io = getIO();
        io.emit("newReport", { report });
        res.status(201).json({
            status: "success",
            report,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}