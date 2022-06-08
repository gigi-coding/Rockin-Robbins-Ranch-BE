const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: Number,
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews