const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    price: Number,
    rating: Number,
});

const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms;