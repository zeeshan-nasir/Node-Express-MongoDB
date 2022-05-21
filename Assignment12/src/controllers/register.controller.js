const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
};

// To register user

router.post("",

    body("email")
        .isEmail()
        .withMessage("Email is invalid"),

    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Length should be of atleast 8 characters")
        .custom((value) => {
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

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).send({ message: "Email already exists" })
            }

            user = await User.create(req.body);
            const token = generateToken(user);

            return res.status(200).send({ user, token });
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    });


module.exports = router;