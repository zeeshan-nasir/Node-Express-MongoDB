const express = require("express");
const Submission = require("../models/submission.model.js");

const router = express.Router();

router.get("", async (req, res) => {
    try {
        const submission = await Submission.find().sort({ marks: -1 }).limit(1).populate({
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


module.exports = router;


