const User = require('../models/userModel');

//function to update account data
exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    })
}

exports.getOneUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    })
}