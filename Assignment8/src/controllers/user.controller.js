const express = require("express");
const transporter = require("../configs/mail.js");

const User = require("../models/user.model.js");

const router = express.Router();

// Send emails

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);

        transporter.sendMail({
            from: "<zeeshan@pog.com>",
            to: user.email,
            subject: `Welcome to ABC system ${user.first_name}`,
            text: `Hi ${user.first_name}, Please confirm your email address.`,
            html: `<b>Hi ${user.first_name}, Please confirm your email address.</b>`,
        });

        transporter.sendMail({
            from: `<zeeshan@pog.com>`,
            to: `jatin@pog.com, adnan@pog.com, megha@pog.com, eshan@pog.com, yunglean@pog.com`,
            subject: `${user.first_name} ${user.last_name} has registered with us.`,
            text: `Please welcome ${user.first_name} ${user.last_name}.`,
            html: `<b>Please welcome ${user.first_name} ${user.last_name}.</b>`,
        });

        return res.status(200).send("User registration successfull!");
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Pagination

router.get("", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;
        const skip = (page - 1) * pagesize;

        const user = await User.find().skip(skip).limit(pagesize).lean().exec();
        const totalPages = Math.ceil(
            (await User.find().countDocuments()) / pagesize
        );
        return res.status(200).send({ user, totalPages });
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
