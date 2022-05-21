const mongoose = require("mongoose");

let gallerySchema = new mongoose.Schema({
    userPictures: [{ type: String, required: true }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model("gallery", gallerySchema);