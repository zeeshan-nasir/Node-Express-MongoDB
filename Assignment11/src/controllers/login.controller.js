const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/user.model.js");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
};

// For login

router.post("",
    body("email")
        .isEmail()
        .withMessage("Email is invalid"),

    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(500).send({ error: "Wrong Email or Password" });
            }

            if (user.password == password) {
                const token = generateToken(user);
                return res.status(200).send({ Message: "User signin successfull!", user, token });
            }
            else {
                return res.status(500).send({ error: "Wrong Email or Password" });
            }
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    });

module.exports = router;
