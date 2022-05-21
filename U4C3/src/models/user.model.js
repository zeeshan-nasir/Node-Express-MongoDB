const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    profileImages: { type: String, required: true },
    password: { type: String, required: true },
    timestamps: { type: String, required: true },
},
    {
        versionKey: false
    });

module.exports = mongoose.model("user", userSchema);