const express = require("express");
const Student = require("../models/student.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", async (req, res) => {
    try {
        const student = await Student.find().lean().exec();
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean().exec();
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;


