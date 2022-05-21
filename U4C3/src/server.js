const connect = require("./configs/db.js");
const app = require("./index.js");

app.listen(4000, async () => {
    try{
        await connect();
    }
    catch(err){
        console.log(err.message);
    }
    console.log("Listening on port 4000");
});