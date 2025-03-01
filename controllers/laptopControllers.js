const AppError = require('../utils/errorClass');
const Laptop = require('../models/laptopModel');
const APIFeautures = require('../utils/feautures');
const cloudinary = require("../config/cloudinary");
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

        //construct the specs object
        const specs = {};
        const specsFields = ['processor', 'RamSize', 'RamType', 'RamSpeed', 'GPU', 'storage', 'displaySize', 'displayQuality', 'displayType'];
        for (const spec of Object.keys(req.body)) {
            if (specsFields.includes(spec)) {
                specs[spec] = req.body[spec]
            }
        }
        // Construct Laptop object
        const LaptopObj = {
            model: req.body.model,
            specs,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            quantitySold: req.body.quantitySold,
            images: req.images
        };

        // Create laptop in DB
        const laptop = await Laptop.create(LaptopObj);

        res.status(201).json({
            status: "success",
            laptop,
        });
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

exports.updateLaptop = async (req, res, next) => {
    try {
        const id = req.params.id
        const updates = {};
        if (req.images) {
            updates.images = req.images;
        }
        for (const key in req.body) {
            if (typeof req.body[key] === "object" && req.body[key] !== null) {
                for (const subKey in req.body[key]) {
                    updates[`${key}.${subKey}`] = req.body[key][subKey];
                }
            } else {
                updates[key] = req.body[key];
            }
        }
        console.log("Update Object:", updates);
        const updatedLaptop = await Laptop.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

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