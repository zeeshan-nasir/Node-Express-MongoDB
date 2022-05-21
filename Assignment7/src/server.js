const app = require("./index.js");
const connect = require("./configs/db.js");

app.listen(4000, async () => {
    try {
        await connect();
        console.log("listening on port 4000");
    }
    catch (err) {
        console.log(err.message);
    }
});