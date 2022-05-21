const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://zeeshannasir:zeeshan@cluster0.iltt7.mongodb.net/u4c4");
}