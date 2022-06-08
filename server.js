///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
// import middleware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose..⚡️🔌 ⚡️"))
.on("close", () => console.log("You are disconnected from mongoose..🚫 🔌 🚫"))
.on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
app.use(cors()); //to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("I'm working YAY!");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));