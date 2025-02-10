const AppError = require('../utils/errorClass');
const Laptop = require('../models/laptopModel');
const APIFeautures = require('../utils/feautures');

exports.getAllLaptops = async (req, res, next) => {
    try {
        const laptops = new APIFeautures(Laptop.find(), req.query).filter().sort().paginate();
        const finalLaptops = await laptops.query.exec();
        res.status(200).json({
            status: "success",
            Laptops: finalLaptops,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.getOneLaptop = async (req, res, next) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.status(200).json({
            status: "success",
            laptop,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}
exports.addLaptop = async (req, res, next) => {
    try {
        const laptop = await Laptop.create(req.body);
        res.status(201).json({
            status: "success",
            laptop,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.updateLaptop = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedLaptop = await Laptop.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: "success",
            updatedLaptop,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.daleteLaptop = async (req, res, next) => {
    try {
        const id = req.params.id
        await Laptop.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}