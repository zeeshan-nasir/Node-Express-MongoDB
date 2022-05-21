const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
};

// For login

router.post("", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Wrong Email or Password");
        }

        const match = user.checkPassword(req.body.password);
        if (!match) {
            return res.status(400).send({ message: "Wrong Email or Password" });
        }

        const token = generateToken(user);
        return res.status(200).send({ user, token });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
