const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Book = require("../models/book.model.js");

const upload = require("../middlewares/upload.js");

router.post("", upload.single("coverImage"), async (req, res) => {
    try {
        const book = await Book.create({
            likes: req.body.likes,
            coverImage: req.file.path,
            content: req.body.content,
            timestamps: req.body.timestamps,
        });

        return res.status(200).send(book);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}
)

module.exports = router;