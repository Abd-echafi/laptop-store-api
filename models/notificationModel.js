const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, default: 'New Order' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    adminIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of admins to notify
    active: { type: Boolean, default: true }, // True when order is pending
    type: { type: String, required: true, default: "Order" },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Notification', notificationSchema);
