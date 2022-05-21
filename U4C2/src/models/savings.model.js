const mongoose = require("mongoose");

const savingsSchema = new mongoose.Schema({
    account_number: { type: Number, required: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    userId:{
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

const Savings = mongoose.model("savingsaccount", savingsSchema);

module.exports = Savings;