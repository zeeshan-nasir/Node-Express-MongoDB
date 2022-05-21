const express = require("express");
const app = express();

const registerController = require("./controllers/register.controller.js");
const bookController = require("./controllers/book.controller.js");
const commentController = require("./controllers/comment.controller.js");
const loginController = require("./controllers/login.controller.js");
// const postsController = require("./controllers/posts.controller.js");

app.use(express.json());

// To register users

app.use("/register", registerController);

// To create book

app.use("/books", bookController);

// To create comment

app.use("/comment", commentController);

// User login

app.use("/login", loginController);

// To see 10 posts

// app.use("/posts", postsController);

module.exports = app;