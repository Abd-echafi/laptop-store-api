const Checkout = require('../models/checkoutModel');
const Order = require('../models/orderModel');
const AppError = require('../utils/errorClass');
const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const { getIO } = require('../socketIO');
exports.makeOrder = async (req, res, next) => {
    try {
        // 1) get checkout and laptops bought from req
        const checkout = req.body.checkout;
        let laptops = [];
        req.body.laptops.forEach((el, i) => {
            laptops[i] = el;
        })
        // 2) create a checkout in the DB
        const newCheckout = await Checkout.create(checkout);
        // 3) create the order object and create an order in DB
        const order = { checkout: newCheckout._id, laptops: laptops };
        let newOrder = await Order.create(order);
        // 4) create the notification object and document in the DB
        const admins = await User.find();
        let adminIds = [];
        admins.forEach((el, i) => {
            adminIds[i] = el._id;
        })
        let notificationObj = { adminIds, orderId: newOrder._id };
        const notification = await Notification.create(notificationObj);
        const io = getIO();
        io.emit('notification', notification);
        // 5) update the newOrder document
        newOrder = await Order.findByIdAndUpdate(newOrder._id, { notification: notification._id })
        // 6) return response
        res.status(201).json({
            status: 'success',
            message: ' order registred in success',
            order: newOrder,
            notification,
        });
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}