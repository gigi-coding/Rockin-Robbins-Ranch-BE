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
module.exports = Reviews