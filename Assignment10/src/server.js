const connect = require("./configs/db.js");
const app = require("./index.js");

app.listen(4000, async () => {
    try {
        await connect();
        console.log("Listening on port 4000");
    }
    catch (err) {
        console.log(err.message);
    }
});