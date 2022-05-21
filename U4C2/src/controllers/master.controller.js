const express = require("express");
const router = express.Router();

const Master = require("../models/master.model.js");


router.get("", async (req, res) => {
    try {
        const master = await Master.find().populate("userId").populate("managerId").populate("branchId").lean().exec();
        return res.status(200).send(master);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const master = await Master.findById(req.params.id).populate("userId").populate("managerId").populate("branchId").lean().exec();
        return res.status(200).send(master);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;