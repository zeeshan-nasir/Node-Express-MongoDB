const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.js");

const Post = require("../models/post.model.js");


router.post("", authenticate, async (req, res) => {
    req.body.user_id = req.userID;
    try {
        const post = await Post.create(req.body);
        return res.status(200).send(post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", authenticate, async (req, res) => {
    try {
        const post = await Post.find().populate({
            path: "userId",
            select: { name: 1, email: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: "userId",
            select: { name: 1, email: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send(post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        return res.status(200).send(post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
