const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
    image: String,
    description: String,
    rating: Number,
    amenities: String,
});

const Rooms = mongoose.model("locations", roomsSchema);

module.exports = Rooms;