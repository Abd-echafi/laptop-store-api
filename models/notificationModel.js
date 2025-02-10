const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, default: 'New Order' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    adminIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of admins to notify
    active: { type: Boolean, default: true }, // True when order is pending
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Notification', notificationSchema);
