const express = require("express");
const router = express.Router();

const Savings = require("../models/savings.model.js");


router.post("", async (req, res) => {
    try {
        const savings = await Savings.create(req.body);
        return res.status(200).send(savings);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;