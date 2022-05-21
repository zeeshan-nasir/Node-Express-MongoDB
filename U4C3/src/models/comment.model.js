const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    body: { type: String, required: true },
    timestamps: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model("publication", commentSchema);