const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require("../models/user.model.js");

const upload = require("../middlewares/upload.js");

router.post("",
    body("firstName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please enter first name")
        .isLength({ min: 3, max: 30 })
        .withMessage("First name should be between 3 and 30 characters"),

    body("lastName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please enter last name")
        .isLength({ min: 3, max: 30 })
        .withMessage("First name should be between 3 and 30 characters"),

    body("age")
        .not()
        .isEmpty()
        .withMessage("Please enter age")
        .custom((value) => {
            if (!(value > 0 && value < 150)) {
                throw new Error("Invalid age")
            }
            return true;
        }),

    body("email ")
        .isEmail()
        .withMessage("Invalid email Id")
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("Email already exists")
            }
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


    upload.any("profileImages"),

    async (req, res) => {
        try {
            const user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                email: req.body.email,
                profileImages: req.file.path,
                timestamps: req.body.timestamps,
            });
            return res.status(200).send(user);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    }
)

module.exports = router;