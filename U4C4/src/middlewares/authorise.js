const Todo = require("../models/todo.models");

const authorise = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (req.userId == todo.userId) {
            return next();
        }

        return res.status(401).send("Authorisation failed");
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = authorise;