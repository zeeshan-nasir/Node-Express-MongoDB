const express = require("express");
const router = express.Router();

const User = require("../models/savings.model.js");


router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;