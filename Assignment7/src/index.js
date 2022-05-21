const express = require("express");
const app = express();

const userController = require("./controllers/user.controller.js");
const studentController = require("./controllers/student.controller.js");
const batchController = require("./controllers/batch.controller.js");
const evaluationController = require("./controllers/evaluation.controller.js");
const submissionController = require("./controllers/submission.controller.js");

// fetch evaluations
const fetchEval = require("./controllers/fetchEval.js");

// fetch student with highest score
// Sorts and fetches only top one
const fetchStu = require("./controllers/fetchStu.js");

app.use(express.json());

app.use("/users", userController);
app.use("/students", studentController);
app.use("/batches", batchController);
app.use("/evaluations", evaluationController);
app.use("/submissions", submissionController);

// fetch evaluations
app.use("/evaluation", fetchEval);

// fetch student with highest score
// Sorts and fetches only top one
app.use("/highScore", fetchStu);

module.exports = app;