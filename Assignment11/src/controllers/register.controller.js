const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/user.model.js");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
};

// To register user

router.post("",
    body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 5 })
        .withMessage("Name should have atleast 5 characters"),

    body("email")
        .isEmail()
        .withMessage("Email is invalid")
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("Email is already taken");
            };
            return true;
        }),

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

            const user = await User.create(req.body);
            const token = generateToken(user);
            return res.status(200).send({ user, token });
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    });


module.exports = router;