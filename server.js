///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rooms = require("./rooms")

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

// MODELS
const roomSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    price: Number,
    rating: Number,
});
const Room = mongoose.model("Room", roomSchema);

const reviewsSchema = new mongoose.Schema({
    comment: String,
    rating: Number,
},
{
    timestamp: true
});
const Reviews = mongoose.model("Reviews", reviewsSchema);

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors()); //to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// REGISTER CONTROLLERS
////////////////////////////////
// app.use("/reviews", reviews);
// app.use("/rooms", rooms);

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("TESTING THE RANCH!");
});

//ROOM INDEX ROUTE
app.get("/room", async (req, res) => {
    try {
        //to get all rooms
        res.send(rooms);
    } catch (error) {
        console.log(error)
        //send error
        res.status(400).json(error);
    }
});

//POST ROUTE
app.post("/room", async (req, res) => {
    try {
        res.json(await Room.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

// UPDATE ROUTE
app.put("/room/:id", async (req, res) => {
    try {
        res.json(
            await Room.findByIdAndUpdate(req.params.id, req.body)
        );
    } catch (error) {
        res.status(400).json(error);
    }
})

//DELETE ROUTE
app.delete("/room/:id", async (req, res) => {
    try {
        res.json(await Room.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

//FOR USER REVIEWS
app.get("/reviews", async(req,res) =>{
    try {
        res.json(await Reviews.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//for user reviews and ratings
app.post("/reviews", async (req, res) => {
    try {
        res.json(await Reviews.create(req.body));
        // if review update is successful
        res.status(200).send("Updated Sucessfully!")
    } catch (error) {
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));