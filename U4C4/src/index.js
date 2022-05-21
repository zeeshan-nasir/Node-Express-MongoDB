const express = require("express");
const app = express();

const registerController = require("./controllers/register.controller.js");
const loginController = require("./controllers/login.controller.js");
const todosController = require("./controllers/todo.controller.js");

app.use(express.json());

// endpoint to create new users

app.use("/register", registerController);

// endpoint to login the user

app.use("/login", loginController);

// endpoint to todos CRUD

app.use("/todos", todosController);

module.exports = app;