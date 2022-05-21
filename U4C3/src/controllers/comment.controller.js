const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model.js");

router.post("", async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.likes,
            timestamps: req.body.timestamps,
        });

        return res.status(200).send(comment);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;