const express = require("express");
const router = express.Router();

const Fixed = require("../models/savings.model.js");


router.post("", async (req, res) => {
    try {
        const fixed = await Fixed.create(req.body);
        return res.status(200).send(fixed);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const fixed = await Fixed.findByIdAndDelete(req.params.id);
        return res.status(200).send(fixed);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;
