const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require("../models/user.model.js");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
}

router.post("",
    body("firstName")
        .not()
        .isEmpty()
        .withMessage("First name cannot be empty"),

    body("lastName")
        .not()
        .isEmpty()
        .withMessage("Last name cannot be empty"),

    body("email")
        .not()
        .isEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email Id"),

    body("password")
        .not()
        .isEmpty()
        .withMessage("Password name cannot be empty")
        .custom(value => {
            const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
            if (!value.match(passw)) {
                throw new Error("Password must be strong");
            }
            return true;
        }),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(500).send("User already exists");
            }

            user = await User.create(req.body);
            const token = generateToken(user);
            return res.status(200).send({ user, token });
        }
        catch (err) {
            return res.status(200).send({ Error: err });
        }
    });

module.exports = router;