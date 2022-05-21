const express = require("express");
const router = express.Router();

const fs = require("fs");

const Gallery = require("../models/gallery.model.js");

const upload = require("../middlewares/upload.js");


router.get('', async (req, res) => {
    try {
        const gallery = await Gallery.find().populate({
            path: "userId",
            select: { firstName: true, lastName: true, profilePic: true },
        }).lean().exec();

        return res.status(200).send(gallery);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


// To upload 5 pictures

router.post("", upload.array("userPictures", 5), async (req, res) => {
    try {
        const filePaths = req.files.map((file) => {
            return file.path;
        });

        const gallery = await Gallery.create({
            userId: req.body.userId,
            userPictures: filePaths,
        });

        return res.status(200).send(gallery);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


// To delete gallery pictures

router.delete("/delete/:id", async (req, res) => {
    try {
        let gallery = await Gallery.findById(req.params.id);

        gallery.userPictures.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Gallery deleted");
                };
            });
        });

        gallery.delete();

        res.status(200).send(gallery);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;