const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: "f7c786c02fb9de",
        pass: "edcdd140bcacb8",
    },
});

module.exports = transporter;