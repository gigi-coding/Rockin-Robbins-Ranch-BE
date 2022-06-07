const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: Number,
});

const Reviews = mongoose.model("reviews", reviewSchema);

module.exports = Reviews