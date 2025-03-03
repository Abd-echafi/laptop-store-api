const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [3, "Full name must be at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        comfirmPassword: {
            type: String,
            required: [true, "Password confirmation is required"],
            validate: {
                validator: function (value) {
                    // `this.password` is available only on `save()` or `create()`
                    console.log();
                    return value === this.password;
                },
                message: "Passwords do not match",
            },
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate(); // Get the updated fields

    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
        update.confirmPassword = undefined; // Remove confirm field
    }

    next();
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.comfirmPassword = undefined; // Remove confirm field
    }
    next();
});



// Method to compare passwords
userSchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
    return await bcrypt.compare(candidatePassword, currentPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamps) {
    if (this.ChangesAt) {
        const changedTimestamps = parseInt(this.ChangesAt.getTime() / 1000, 10);
        console.log(JWTTimestamps, changedTimestamps);
        return JWTTimestamps < changedTimestamps;
    }
    // false means that the pass does not changed
    return false;
}

userSchema.methods.createResetPassToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(resetToken, this.passwordResetToken);
    this.passwordResetExpires = new Date() + 10 * 60 * 1000;
    return resetToken
}
module.exports = mongoose.model("User", userSchema);
