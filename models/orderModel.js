const { required } = require("joi");
const mongoose = require("mongoose");
const Laptop = require('./laptopModel');
const Notification = require('./notificationModel');
const { findById } = require("./userModel");
const AppError = require('../utils/errorClass');

const orderSchema = new mongoose.Schema(
    {
        checkout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Checkout", // Reference to the Checkout model
            required: true,
        },
        laptops: [{
            laptop: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Laptop", // Reference to the Laptop model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"],
                default: 1,
            },
        }],
        orderDate: {
            type: Date,
            default: Date.now,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Refunded", "On Hold", "Failed", "Returned"],
            default: "Pending",
        },
        notification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification", // Reference to the Laptop model
        }
    },
    { timestamps: true }
);


orderSchema.post('findOneAndUpdate', async function (doc, next) {
    try {
        // Access the updated document
        const updatedOrder = await Order.findById(doc._id);

        // Check if the order status is "Delivered"
        if (updatedOrder.orderStatus === "Delivered") {
            for (const el of updatedOrder.laptops) {
                const laptop = await Laptop.findById(el.laptop);
                console.log(laptop);
                const numberSold = laptop.quantitySold + el.quantity;
                await Laptop.findByIdAndUpdate(laptop._id, { quantitySold: numberSold });
            }
            console.log("after loop")
        }
        if (updatedOrder.orderStatus !== "Pending") {
            await Notification.findByIdAndUpdate(updatedOrder.notification, { active: false })
        }
        next();
    } catch (err) {
        next(new AppError(err.message, 400));
    }
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;