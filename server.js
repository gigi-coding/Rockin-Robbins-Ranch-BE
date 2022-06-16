///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import middleware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(
    MONGODB_URL,
    {
        useNewUrlParser: true,
    }
);

// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose..⚡️🔌 ⚡️"))
.on("close", () => console.log("You are disconnected from mongoose..🚫 🔌 🚫"))
.on("error", (error) => console.log(error));


const mongoose = require('mongoose');

///////////////////////////////
// MODELS
////////////////////////////////
const ReviewsSchema = new mongoose.Schema({
    name: String,
    review: {
        type: String,
        required: true,
    },
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);
// module.exports = Reviews

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
    res.send("TESTING THE RANCH!");
});

const db = require("./models/Reviews")

// FOR USER REVIEWS page
app.get("/reviews", async(req,res) =>{
    try {
        console.log('anything')
        res.json(await Reviews.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});


// POST A REVIEW
// app.post("/reviews", async (req, res) => {
//     try {
//         res.json(await Reviews.create(req.body));
//         // if review update is successful
//         res.status(200).send("Added Sucessfully!")
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });
app.post('/reviews', async (req, res) => {
const name = req.body.name
const review = req.body.review
let newReview = {name: name, review: review}
console.log(newReview)
// const reviews = new reviewsModel({ name: name, review: review});

    try {
        res.json(await reviews.create(req.body))
        res.status(200).send('this workss')
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/read', async(req, res)=> {
    reviewsModel.find({}, (err, result)=> {
        if (err) {
            res.send(err);
        }
        res.send(result)
    })
})

// // UPDATE REVIEW
// app.put("/reviews", async (req, res) => {
//     try {
//         res.json(
//             await Reviews.findByIdAndUpdate(req.params.id, req.body)
//         );
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

// // DELETE A REVIEW
// app.delete("/reviews", async (req, res) => {
//     try {
//         res.json(await Reviews.findByIdAndDelete(req.params.id));
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));