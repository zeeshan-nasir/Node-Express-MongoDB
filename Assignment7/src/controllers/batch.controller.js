const express = require("express");
const Batch = require("../models/batch.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const batch = await Batch.create(req.body);
        return res.status(200).send(batch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", async (req, res) => {
    try {
        const batch = await Batch.find().lean().exec();
        return res.status(200).send(batch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id).lean().exec();
        return res.status(200).send(batch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(batch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const batch = await Student.findByIdAndDelete(req.params.id);
        return res.status(200).send(batch);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;


