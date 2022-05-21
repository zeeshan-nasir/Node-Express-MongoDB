const express = require("express");
const router = express.Router();

const fs = require("fs");

const User = require("../models/user.model.js");

const upload = require("../middlewares/upload.js");


router.get("", async (req, res) => {
    try {
        const user = await User.find().lean().exec();

        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// Creating a user

router.post("", upload.single("profilePic"), async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profilePic: req.file.path,
        });
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

// Updating a user

router.patch("/update/:id", upload.single("profilePic"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        fs.unlink(user.profilePic, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("User updated");
            }
        });

        user = await User.findByIdAndUpdate(req.params.id, { profilePic: req.file.path });

        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


// Deleting a user along with the files

router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        fs.unlink(user.profilePic, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("User deleted");
            }
        });

        user.delete();

        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;