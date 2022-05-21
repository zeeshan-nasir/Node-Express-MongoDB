const mongoose = require("mongoose");

const fixedSchema = new mongoose.Schema({
    account_number: { type: Number, required: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    startDate: { type: String, required: true },
    maturityDate: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
},
    {
        versionKey: false
    });

const Fixed = mongoose.model("fixedaccount", fixedSchema);

module.exports = Fixed;