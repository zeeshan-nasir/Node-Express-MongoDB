const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    date_of_evaluation: { type: String, required: true },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true
    },
},
    {
        versionKey: false,
        timestamps: true
    });

const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = Evaluation;