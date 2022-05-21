const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;