const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
    balance: { type: Number, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    managerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    branchId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "branchdetail"
    }
},
    {
        versionKey: false
    });

const Master = mongoose.model("masteraccount", masterSchema);

module.exports = Master;