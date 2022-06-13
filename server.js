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


const reviewsSchema = new mongoose.Schema({
    name: String,
    month: String,
    review: String,
    image: String,
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
// app.get("/", (req, res) => {
//     res.send("TESTING THE RANCH!");
// });

//FOR USER REVIEWS page
app.get("/reviews", async(req,res) =>{
    try {
        res.json(await Reviews.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// POST A REVIEW
app.post("/reviews", async (req, res) => {
    try {
        res.json(await Reviews.create(req.body));
        // if review update is successful
        res.status(200).send("Added Sucessfully!")
    } catch (error) {
        res.status(400).json(error);
    }
});

// UPDATE REVIEW
app.put("/reviews", async (req, res) => {
    try {
        res.json(
            await Reviews.findByIdAndUpdate(req.params.id, req.body)
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE A REVIEW
app.delete("/reviews", async (req, res) => {
    try {
        res.json(await Reviews.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));