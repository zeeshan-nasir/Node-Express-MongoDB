const express = require("express");
const app = express();

const userController = require("./controllers/user.controller.js");
const registerController = require("./controllers/register.controller.js");
const loginController = require("./controllers/login.controller.js");
const postController = require("./controllers/post.controller.js");

app.use(express.json());

app.use("/users", userController);

app.use("/register", registerController);

app.use("/login", loginController);

app.use("/posts", postController);

module.exports = app;