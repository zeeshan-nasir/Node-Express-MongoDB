const express = require("express");
const router = express.Router();

const Branch = require("../models/branch.model.js");


router.post("", async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        return res.status(200).send(branch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;