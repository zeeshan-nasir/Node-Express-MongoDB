const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model("user", userSchema);