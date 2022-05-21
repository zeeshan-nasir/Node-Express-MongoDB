const express = require("express");
const router = express.Router();

const Product = require("../models/product.model.js");

const authenticate = require("../middlewares/authenticate.js");
const authorise = require("../middlewares/authorise.js");


// For posting products

router.post("", authenticate, async (req, res) => {
    req.body.user_id = req.userID;
    try {
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

router.get("", async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: "userId",
            select: { name: 1, email: 1, _id: 0 }
        }).lean().exec();
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", authenticate, authorise(["admin", "seller"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", authenticate, authorise(["admin", "seller"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;