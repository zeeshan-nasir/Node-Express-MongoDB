const express = require("express");
const router = express.Router();

const Todo = require("../models/todo.model.js");

const authenticate = require("../middlewares/authenticate.js");

// endpoint that returns all todos of the logged in user

router.get("", authenticate, async (req, res) => {
    try {
        const todo = await Todo.find({ userId: req.body.userId });

        return res.status(200).send({ Todo: todo });
    }
    catch (err) {
        return res.status(500).send({ Error: err });
    }
});

// endpoint for the logged in user to create a todo

router.post("", authenticate, async (req, res) => {
    try {
        const todo = await Todo.create(req.body);

        return res.status(200).send({ Todo: todo });
    }
    catch (err) {
        return res.status(500).send({ Error: err });
    }
});

// endpoint where if the todo user is same as logged in user then it shows the todo else it will throw an error with status code 401

router.get("/:id", authenticate, authorise, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        return res.status(200).send({ Todo: todo });
    }
    catch (err) {
        return res.status(500).send({ Error: err });
    }
});

// endpoint where if the todo user is the same as logged in user then user can update the todo else it will throw an error with status code 401

router.patch("/:id", authenticate, authorise, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).send({ Todo: todo });
    }
    catch (err) {
        return res.status(500).send({ Error: err });
    }
});

// endpoint where if the todo user is the same as logged in user then user can delete the todo else it will throw an error with status code 401

router.delete("/:id", authenticate, authorise, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        return res.status(200).send({ Todo: todo });
    }
    catch (err) {
        return res.status(500).send({ Error: err });
    }
});

module.exports = router;