const dns = require("dns");
require("dotenv").config();


const Port = process.env.PORT || 3000;

dns.setServers(["1.1.1.1" , "8.8.8.8"]);

const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();


app.listen(Port , () => {
    console.log("App is working on port 3000");
});
