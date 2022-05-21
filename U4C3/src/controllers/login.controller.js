const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require("../models/user.model.js");

const upload = require("../middlewares/upload.js");

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
                return res.status(200).send("User signin successfull!");
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