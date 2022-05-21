const express = require("express");
const app = express();

const userController = require("./controllers/user.controller.js");
const galleryController = require("./controllers/gallery.controller.js");

app.use(express.json());

app.use("/users", userController);

app.use("/gallery", galleryController);

module.exports = app;