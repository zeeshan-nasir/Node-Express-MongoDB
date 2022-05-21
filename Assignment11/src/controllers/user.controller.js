const express = require("express");
const router = express.Router();


const User = require("../models/user.model.js");


router.get("", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;