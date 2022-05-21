const express = require("express");
const app = express();

const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
}

const passport = require("./configs/google.auth.js");

const userController = require("./controllers/user.controller.js");
const registerController = require("./controllers/register.controller.js");
const loginController = require("./controllers/login.controller.js");
const productController = require("./controllers/product.controller.js");

app.use(express.json());

app.use("/users", userController);
app.use("/register", registerController);
app.use("/login", loginController);
app.use("/products", productController);


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),

    function (req, res) {
        const token = generateToken(req.user)
        return res.status(200).send({ user: req.user, token });
    }
);

module.exports = app;