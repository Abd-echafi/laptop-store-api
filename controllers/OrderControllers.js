const AppError = require('../utils/errorClass');
const Order = require('../models/orderModel');
const APIFeautures = require('../utils/feautures');

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = new APIFeautures(Order.find(), req.query).filter().sort().paginate();
        const finalOrders = await orders.query.exec();
        res.status(200).json({
            status: "success",
            Orders: finalOrders,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({
            status: "success",
            order,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Use findByIdAndUpdate with { new: true } to return the updated document
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                order: updatedOrder,
            },
        });
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

exports.daleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        await Order.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}