const express = require("express");
const Submission = require("../models/submission.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const submission = await Submission.create(req.body);
        return res.status(200).send(submission);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", async (req, res) => {
    try {
        const submission = await Submission.find().populate({
            path: "evaluationId",
            select: { date_of_evaluation: 1, _id: 0 }
        }).populate({
            path: "studentId",
            select: { batchName: 1, _id: 0 }
        }).find().lean().exec();
        return res.status(200).send(submission);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).populate({
            path: "evaluationId",
            select: { date_of_evaluation: 1, _id: 0 }
        }).populate({
            path: "studentId",
            select: { batchName: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(submission);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "evaluationId",
            select: { date_of_evaluation: 1, _id: 0 }
        }).populate({
            path: "studentId",
            select: { batchName: 1, _id: 0 }
        });
        return res.status(200).send(submission);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        return res.status(200).send(submission);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;


