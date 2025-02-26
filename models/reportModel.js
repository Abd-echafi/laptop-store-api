const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    wilaya: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    status: {
        type: String,
        enum: ["Pending", "In_progress", "resolved", "rejected"],
        default: "Pending",
        //pending → The report has been submitted but not reviewed yet.
        //in_progress → An admin is handling the issue.
        //resolved → The issue has been fixed or addressed.
        //rejected → The report was reviewed but not accepted for action.
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
