const { required } = require("joi");
const mongoose = require("mongoose");
const checkoutSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
        commune: { type: String, required: true },
        wilaya: { type: String, required: true },
    },
    note: {
        type: String,
        maxlength: [200, "description cannot exceed 200 characters"],
    },
    shippingType: {
        type: String,
        enum: ['bureau', 'domicile'],
        required: true,
    },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;