const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb+srv://zeeshannasir:zeeshan@cluster0.iltt7.mongodb.net/library");
}

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

const Section = mongoose.model("section", sectionSchema);

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

const Book = mongoose.model("book", bookSchema);

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

const Author = mongoose.model("author", authorSchema);

const checkedOutSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    checkedOutTime: { type: String, default: null, required: true },
    checkedInTime: { type: String, default: null, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

const CheckedOut = mongoose.model("checkedOut", checkedOutSchema);

// Sections CRUD

app.post("/sections", async (req, res) => {
    try {
        const section = await Section.create(req.body);
        return res.status(200).send({ section: section });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/sections", async (req, res) => {
    try {
        const section = await Section.find().lean().exec();
        return res.status(200).send({ section: section });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).lean().exec();
        return res.status(200).send({ section: section });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.patch("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send({ section: section });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.delete("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        return res.status(200).send({ section: section });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});



// Books CRUD

app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(200).send({ book: book });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/books", async (req, res) => {
    try {
        const book = await Book.find().populate({
            path: "sectionId",
            select: { title: 1, _id: 0 },
        }).populate({
            path: "authorId",
            select: { firstName: 1, lastName: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ book: book });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate({
            path: "sectionId",
            select: { title: 1, _id: 0 },
        }).populate({
            path: "authorId",
            select: { firstName: 1, lastName: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ book: book });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});


app.patch("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "sectionId",
            select: { title: 1, _id: 0 },
        }).populate({
            path: "authorId",
            select: { firstName: 1, lastName: 1, _id: 0 },
        });
        return res.status(200).send({ book: book });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        return res.status(200).send({ book: book });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});



// Authors CRUD

app.post("/authors", async (req, res) => {
    try {
        const author = await Author.create(req.body);
        return res.status(200).send({ author: author });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/authors", async (req, res) => {
    try {
        const author = await Author.find().populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ author: author });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ author: author });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.patch("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        });
        return res.status(200).send({ author: author });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.delete("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        return res.status(200).send({ author: author });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});


// CheckedOut CRUD

app.post("/checkedOut", async (req, res) => {
    try {
        const checkedOut = await CheckedOut.create(req.body);
        return res.status(200).send({ checkedOut: checkedOut });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/checkedOut", async (req, res) => {
    try {
        const checkedOut = await CheckedOut.find().populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ checkedOut: checkedOut });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.get("/checkedOut/:id", async (req, res) => {
    try {
        const checkedOut = await CheckedOut.findById(req.params.id).populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send({ checkedOut: checkedOut });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.patch("/checkedOut/:id", async (req, res) => {
    try {
        const checkedOut = await CheckedOut.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "bookId",
            select: { name: 1, _id: 0 },
        });
        return res.status(200).send({ checkedOut: checkedOut });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

app.delete("/checkedOut/:id", async (req, res) => {
    try {
        const checkedOut = await CheckedOut.findByIdAndDelete(req.params.id);
        return res.status(200).send({ checkedOut: checkedOut });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

// API endpoints


//Search all books by author

app.get("/author/:id", async (req, res) => {
    try {
        const book = await Book.find({ authorId: req.params.id }).populate({
            path: "sectionId",
            select: { title: 1, _id: 0 },
        }).populate({
            path: "authorId",
            select: { firstName: 1, lastName: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send(book);
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});


// find books in a section

app.get("/section/:section", async (req, res) => {
    try {
        const book = await Book.find({ sectionId: req.params.section }).populate({
            path: "sectionId",
            select: { title: 1, _id: 0 },
        }).populate({
            path: "authorId",
            select: { firstName: 1, lastName: 1, _id: 0 },
        }).lean().exec();
        return res.status(200).send(book);
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
});


app.listen(4000, async () => {
    try {
        await connect();
    }
    catch (err) {
        console.log({ error: err.message });
    }
    console.log("listening on port 4000");
});