const express = require("express");
const app = express();

const books = require("./books.json")

app.get("", (req, res) => {
    res.send("Hello");
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.listen(4000, () => {
    console.log("listening on port 4000");
});