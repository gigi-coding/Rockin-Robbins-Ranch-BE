const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
    image: String,
    description: String,
    price: Number,
    rating: Number,
});

const Rooms = mongoose.model("locations", roomsSchema);

module.exports = Rooms;