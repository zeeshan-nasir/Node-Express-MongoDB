const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require("../models/user.model.js");

router.post("",
    body("firstName")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("First name connot be empty")
        .isLength({ min: 5 })
        .withMessage("First name should have atleast 5 characters"),

    body("lastName")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("Last name connot be empty")
        .isLength({ min: 5 })
        .withMessage("Last name should have atleast 5 characters"),

    body("email")
        .isEmail()
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("Email is already taken");
            }
            return true;
        }),

    body("pincode")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Pincode should not be empty")
        .isLength({ min: 6, max: 6 })
        .withMessage("Pincode should be of 6 digits"),

    body("age")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Age cannot be empty")
        .custom(value => {
            if (value < 1 || value > 100) {
                throw new Error("Age should be between 1 and 100");
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
            return res.status(200).send(user);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    });


module.exports = router;

