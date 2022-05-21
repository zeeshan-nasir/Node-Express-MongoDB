const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
}

router.post("", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(500).send("Email or password is incorrect");
        }

        let match = user.checkPassword(req.password);

        if (!match) {
            return res.status(500).send("Email or password is incorrect");
        }

        const token = generateToken(user);
        return res.status(200).send({ user, token });
    }
    catch (err) {
        return res.status(200).send({ Error: err });
    }
});

module.exports = router;