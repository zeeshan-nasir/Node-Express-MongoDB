const express = require("express");
const app = express();

const masterController = require("./controllers/master.controller.js");
const savingsController = require("./controllers/savings.controller.js");
const fixedController = require("./controllers/fixed.controller.js");
const userController = require("./controllers/user.controller.js");
const branchController = require("./controllers/branch.controller.js");

app.use(express.json());

// get master account collection details or one account using id 

app.use("/masteraccounts", masterController);

// Create savings account

app.use("/savingsaccounts", savingsController);

// Create fixed account

app.use("/fixedaccounts", fixedController);

// Create user account

app.use("/users", userController);

// Create branch

app.use("/branches", branchController);


module.exports = app;