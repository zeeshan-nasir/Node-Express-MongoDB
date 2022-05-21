const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    rollId: { type: String, required: true },
    batchName: { type: String, required: true },
},
    {
        versionKey: false,
        timestamps: true
    });

const Student = mongoose.model("student", studentsSchema);

module.exports = Student;
