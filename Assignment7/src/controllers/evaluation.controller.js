const express = require("express");
const Evaluation = require("../models/evaluation.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body);
        return res.status(200).send(evaluation);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", async (req, res) => {
    try {
        const evaluation = await Evaluation.find().populate({
            path: "instructor",
            select: { firstName: 1, lastName: 1, _id: 0 }
        }).populate({
            path: "batchId",
            select: { batchName: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(evaluation);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate({
            path: "instructor",
            select: { firstName: 1, lastName: 1, _id: 0 }
        }).populate({
            path: "batchId",
            select: { batchName: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(evaluation);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "instructor",
            select: { firstName: 1, lastName: 1, _id: 0 }
        }).populate({
            path: "batchId",
            select: { batchName: 1, _id: 0 }
        });
        return res.status(200).send(evaluation);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
        return res.status(200).send(evaluation);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;


