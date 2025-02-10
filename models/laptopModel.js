const { number } = require('joi');
const mongoose = require('mongoose');

const specsSchema = new mongoose.Schema({
    processor: {
        type: String,
        required: [true],
    },
    RamSize: {
        type: Number,
        required: [true],
    },
    RamType: {
        type: String,
    },
    RamSpeed: {
        type: Number,
    },
    GPU: {
        type: String,
    },
    storage: {
        type: Number,
        required: [true],
    },
    displaySize: {
        type: Number,
        required: [true],
    },
    displayQuality: {
        type: String,
    },
    displayType: {
        type: String,
    }
})
const laptopSchema = new mongoose.Schema({
    model: {
        type: String,
        required: [true, "a laptop need a model"],
    },
    specs: {
        type: specsSchema,
    },
    images: {
        type: [{ type: String, required: true }],
        required: [true],
    },
    category: {
        type: String,
        Enum: ['etudiant', 'bureautique', 'gaming', 'work'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "laptop must have a price"],
    },
    quantitySold: {
        type: Number,
        default: 0,
    },

})

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;