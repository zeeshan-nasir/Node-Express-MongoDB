const express = require("express");
const Evaluation = require("../models/evaluation.model.js");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.find({ _id: req.params.id }).populate({
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


module.exports = router;


