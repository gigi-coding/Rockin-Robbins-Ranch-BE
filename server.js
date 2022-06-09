///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// import middleware
const cors = require("cors");
const morgan = require("morgan");
const { reviews, rooms  } = require("./controllers");
const { Rooms } = require("./models");

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
// MIDDLEWARE
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

//ROOM INDEX ROUTE
app.get("./rooms", async (req, res) => {
    try {
        //to get all rooms
        res.json(await Rooms.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));